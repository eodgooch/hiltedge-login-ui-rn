function isASCII (str) {
  // eslint-disable-next-line no-control-regex
  return /^[\x00-\x7F]*$/.test(str)
}

export { isASCII }
