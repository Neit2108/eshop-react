/**
 * Kiểm tra email hợp lệ
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Kiểm tra số điện thoại Việt Nam
 */
export function isValidPhone(phone: string): boolean {
  return /^(0|\+84)(\d{9})$/.test(phone.replace(/\s+/g, ""))
}

/**
 * Kiểm tra độ mạnh của mật khẩu
 * Ít nhất 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt
 */
export function isStrongPassword(password: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
}

/**
 * Kiểm tra chuỗi có rỗng không
 */
export function isEmpty(value: string | null | undefined): boolean {
  return !value || value.trim().length === 0
}

/**
 * Kiểm tra 2 chuỗi có trùng nhau không (thường dùng cho confirm password)
 */
export function isMatch(value1: string, value2: string): boolean {
  return value1 === value2
}

/**
 * Kiểm tra định dạng số
 */
export function isNumber(value: string): boolean {
  return !isNaN(Number(value))
}

/**
 * Kiểm tra URL hợp lệ
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
