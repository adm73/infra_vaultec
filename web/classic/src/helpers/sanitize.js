import DOMPurify from 'dompurify';

const SANITIZE_OPTIONS = {
  FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form'],
  FORBID_ATTR: ['srcdoc'],
};

export function sanitizeHtml(content) {
  if (typeof content !== 'string' || content === '') {
    return '';
  }
  return DOMPurify.sanitize(content, SANITIZE_OPTIONS);
}
