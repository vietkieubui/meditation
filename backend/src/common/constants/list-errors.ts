export const ERROR = {
  UNKNOWN: {
    code: 'unhandled',
    message: 'Unhandled error!',
  },
  AUTH_INCORRECT: {
    code: 'auth_incorrect',
    message: 'Tài khoản hoặc mật khẩu không chính xác',
  },
  ACCOUNT_UNVERIFIED: {
    code: 'account_unverified',
    message: 'Tài khoản chưa được xác thực',
  },
  ACCOUNT_VERIFIED: {
    code: 'account_verified',
    message: 'Tài khoản đã được xác thực',
  },
  ACCOUNT_NOT_FOUND: {
    code: 'account_not_found',
    message: 'Không tìm thấy tài khoản của bạn',
  },
  USER_UPDATE_PASSWORD: {
    code: 'user_update_password',
    message: 'Mật khẩu cũ không chính xác',
  },
  USER_NOT_FOUND: {
    code: 'user_not_found',
    message: 'Không tìm thấy người dùng này',
  },
  INVALID_USERNAME: {
    code: 'invalid_username',
    message: 'Tên đăng nhập không hợp lệ',
  },
  _bt_check_unique: {
    code: 'key_already_existed',
    message: 'Key bạn đã nhập đã tồn tại trong database, mời bạn kiểm tra lại',
  },

  AUTHENTICATE_FAIL: {
    code: 'authenticate_failed',
    message: 'Tài khoản hoặc mật khẩu không chính xác',
  },

  DO_NOT_HAVE_PERMISSIONS: {
    code: 'do_not_have_permissions',
    message: 'Bạn không có quyền truy cập chức năng này',
  },

  RESOURCES_NOT_FOUND: {
    code: 'resources_not_found',
    message: 'Không tìm thấy bản ghi!',
  },
  ALREADY_LIKED: {
    code: 'already_liked',
    message: 'Post này đã like!',
  },

  ACCOUNT_BANNED: {
    code: 'account_is_banned',
    message: 'Tài khoản đã bị cấm',
  },

  PAYLOAD_NOT_VALID: {
    code: 'payload_not_valid',
    message: 'Nội dung gửi lên không hợp lệ',
  },

  ID_NOT_VALID: {
    code: 'id_is_not_valid',
    message: 'Id không hợp lệ',
  },

  PHONE_NUMBER_EXISTED: {
    code: 'phone_number_existed',
    message: 'Số điện thoại đã được sử dụng',
  },

  HANDICAP_NOT_CORRECT: {
    code: 'handicap_not_correct',
    message: 'Số handicap chỉ được nằm trong khoảng từ 1 đến 33',
  },

  WEBSOCKET_UNAUTHENTICATED: {
    message: 'You are unauthenticated',
    code: 'WEBSOCKET_UNAUTHENTICATED',
  },
};
