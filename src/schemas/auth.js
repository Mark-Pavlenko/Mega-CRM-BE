const signIn = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      format: "email",
      errorMessage: {
        format: "Field 'email' incorrect",
        type: "Field 'email' should be a string",
      },
    },
    password: {
      type: "string",
      errorMessage: {
        type: "Field 'password' should be a string",
      },
    },
  },
};

const signUp = {
  type: "object",
  required: ["email", "name"],
  properties: {
    email: {
      type: "string",
      format: "email",
      errorMessage: {
        format: "Field 'email' incorrect",
        type: "Field 'email' should be a string",
      },
    },
    name: {
      type: "string",
      minLength: 2,
      maxLength: 30,
      pattern: "^[a-zA-Z0-9_ ]*$",
      errorMessage: {
        pattern: "Field 'name' can contain only letters and spaces",
        type: "Field 'name' should be a string",
      },
    },
  },
};

const refreshTokens = {
  type: "object",
  required: ["refreshToken"],
  properties: {
    refreshToken: {
      type: "string",
      pattern: "^(.*)::(.*)$",
      errorMessage: {
        type: "Field 'refreshToken' should be a string",
        pattern: "Incorrect format 'refreshToken'",
      },
    },
  },
};

const restorePassword = {
  type: "object",
  required: ["email"],
  properties: {
    email: {
      type: "string",
      format: "email",
      errorMessage: {
        format: "Field 'email' incorrect",
        type: "Field 'email' should be a string",
      },
    },
  },
};

const confirmRestorePassword = {
  type: "object",
  required: ["token"],
  properties: {
    token: {
      type: "string",
      errorMessage: {
        type: "Field 'name' should be a string",
      },
    },
  },
};

export default {
  signIn,
  signUp,
  refreshTokens,
  restorePassword,
  confirmRestorePassword,
};
