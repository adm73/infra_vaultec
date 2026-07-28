package service

import (
	"errors"
	"io"
	"strings"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestBoundedResponseReaderAllowsBodyAtLimit(t *testing.T) {
	body, err := io.ReadAll(&boundedResponseReader{
		reader:    strings.NewReader("1234"),
		remaining: 4,
	})

	require.NoError(t, err)
	require.Equal(t, "1234", string(body))
}

func TestBoundedResponseReaderRejectsBodyOverLimit(t *testing.T) {
	body, err := io.ReadAll(&boundedResponseReader{
		reader:    strings.NewReader("12345"),
		remaining: 4,
	})

	require.ErrorIs(t, err, ErrUpstreamResponseTooLarge)
	require.Equal(t, "1234", string(body))
	require.True(t, errors.Is(err, ErrUpstreamResponseTooLarge))
}
