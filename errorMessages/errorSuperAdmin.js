const errors = {
  AlreadyExists: {
    satatusCode: 409,
    errorMessage: "user Already Exists Please use other Email",
  },
  NoToken: {
    satatusCode: 401,
    errorMessage: "Not authorized, no token",
  },
  FailedToken: {
    satatusCode: 403,
    errorMessage: "Not authorized, Failed token",
  },
  DoesNotExists: {
    satatusCode: 404,
    errorMessage: "user Does Not Exists Please other Email",
  },
  FailedToRegister: {
    satatusCode: 400,
    errorMessage: "Failed on To register",
  },
  FailedToGetAll: {
    satatusCode: 400,
    errorMessage: "Failed To Get All users",
  },
  IdDoesNotExists: {
    satatusCode: 404,
    errorMessage: "Id Does Not Exists",
  },
  FailedToUpdate: {
    satatusCode: 400,
    errorMessage: "Failed on To update",
  },
  FailedToDelete: {
    satatusCode: 400,
    errorMessage: "Failed To Delete user",
  },
  //   successfullyCreatedSuperadmin: {
  //     satatusCode: 201,
  //     errorMessage: "Superadmin registered successfully",
  //   },
};

module.exports = errors