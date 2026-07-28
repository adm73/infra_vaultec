package service

import (
	"errors"
	"io"
)

const MaxUpstreamResponseBodySize int64 = 64 << 20

var ErrUpstreamResponseTooLarge = errors.New("upstream response body exceeds 64 MiB limit")

type boundedResponseReader struct {
	reader    io.Reader
	remaining int64
}

func (r *boundedResponseReader) Read(p []byte) (int, error) {
	if r.remaining <= 0 {
		var probe [1]byte
		n, err := r.reader.Read(probe[:])
		if n > 0 {
			return 0, ErrUpstreamResponseTooLarge
		}
		if err == nil {
			return 0, io.ErrNoProgress
		}
		return 0, err
	}

	if int64(len(p)) > r.remaining {
		p = p[:r.remaining]
	}
	n, err := r.reader.Read(p)
	r.remaining -= int64(n)
	return n, err
}

func LimitUpstreamResponseBody(reader io.Reader) io.Reader {
	return &boundedResponseReader{
		reader:    reader,
		remaining: MaxUpstreamResponseBodySize,
	}
}
