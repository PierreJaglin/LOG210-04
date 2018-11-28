const httpResponse = require("../util/httpResponse.js");
const User = require("../models/userModel.js");
const validation = require("../util/fieldValidations");
const jwt = require("jsonwebtoken");

module.exports = class UserController {
  constructor() {
    this.model = new User();
    this.user_list = this.user_list.bind(this);
    this.user_detail = this.user_detail.bind(this);
    this.user_create = this.user_create.bind(this);
    this.user_update = this.user_update.bind(this);
    this.user_delete = this.user_delete.bind(this);
    this.user_signin = this.user_signin.bind(this);
    this.user_block = this.user_block.bind(this);
    this.user_reset = this.user_reset.bind(this);
    this.user_update_password = this.user_update_password.bind(this);
  }

  user_detail(request, response) {
    const id = parseInt(request.query.id);

    const errors = this.isIDValid(id);

    if (errors.length === 0) {
      this.get(id)
        .then(user => {
          if (!user) {
            return httpResponse.badRequest(response, "No user found");
          } else {
            return httpResponse.okRequest(response, user);
          }
        })
        .catch(error => httpResponse.serverError(response, error));
    } else {
      return httpResponse.badRequest(response, errors);
    }
  }

  user_list(request, response) {
    this.getAll()
      .then(list => httpResponse.okRequest(response, list))
      .catch(error => httpResponse.serverError(response, error));
  }

  user_signin(request, response) {
    const username = request.body.credentials.username;
    const password = request.body.credentials.password;

    this.authenticate(username, password)
      .then(result =>
        httpResponse.okRequest(response, {
          username: result.userName,
          profile: result.profileID
        })
      )
      .catch(error => httpResponse.badRequest(response, error));
  }

  user_block(request, response) {
    const username = request.body.username;
    const token = jwt.sign(
      {
        username: username
      },
      "api-secret-key"
    );
    this.block(username, token);
    this.sendEmail(username, token);
  }

  user_reset(request, response) {
    const username = request.body.username;
    const token = jwt.sign(
      {
        username: username
      },
      "api-secret-key"
    );
    this.sendEmail(username, token);
  }

  user_create(request, response) {
    const user = {
      id: 0,
      name: request.body.user.username,
      email: request.body.user.email,
      profile: request.body.user.profile,
      active: request.body.user.active
    };

    const errors = this.isUserValid(user);

    if (errors.length === 0) {
      this.create(user)
        .then(rowID =>
          this.find(user.name)
            .then(user => httpResponse.okRequest(response, user))
            .catch(error => httpResponse.serverError(response, error))
        )
        .catch(error => {
          httpResponse.serverError(response, error);
        });
    } else {
      return httpResponse.badRequest(response, errors);
    }
  }

  user_update(request, response) {
    const user = {
      id: parseInt(request.query.id),
      name: request.body.user.username,
      email: request.body.user.email,
      profile: request.body.user.profile,
      active: request.body.user.active
    };

    const errors = this.isUserValid(user);

    if (errors.length === 0) {
      this.update(user)
        .then(rowID => {
          this.get(user.id)
            .then(user => httpResponse.okRequest(response, user))
            .catch(error => httpResponse.serverError(response, error));
        })
        .catch(error => httpResponse.serverError(response, error));
    } else {
      return httpResponse.badRequest(response, errors);
    }
  }

  user_update_password(request, response) {
    const token = request.query.token;
    const password = request.body.password;

    this.update_password(token, password).then(() => {
      return httpResponse.okRequest(response, "Password changed");
    });
  }

  user_delete(request, response) {
    const id = parseInt(request.query.id);

    const errors = this.isIDValid(id);

    if (errors.length === 0) {
      this.remove(id)
        .then(id => httpResponse.okRequest(response, id))
        .catch(error => httpResponse.serverError(response, error));
    } else {
      return httpResponse.badRequest(response, errors);
    }
  }

  get(id) {
    return this.model.get(id);
  }

  getAll() {
    return this.model.getAll();
  }

  find(name) {
    return this.model.find(name);
  }

  authenticate(username, password) {
    return this.model.authenticate(username, password);
  }

  block(username, token) {
    return this.model.block(username, token);
  }

  sendEmail(username, token) {
    this.model.sendEmail(username, token);
  }

  create(user) {
    return this.model.create(user);
  }

  update(user) {
    return this.model.update(user);
  }

  update_password(token, password) {
    return this.model.update_password(token, password);
  }

  remove(id) {
    return this.model.remove(id);
  }

  /**
   * VALIDATIONS
   */
  isIDValid(id) {
    let errors = [];

    if (!validation.isPositiveNumber(id)) {
      errors.push("The ID is required and must be positive.");
    }

    return errors;
  }

  isUserValid(user) {
    let errors = [];

    if (!validation.isPositiveNumber(user.id)) {
      errors.push("The ID is required and must be positive.");
    }

    if (!validation.isRequiredText(user.name)) {
      errors.push("The name is required.");
    }

    if (
      !(validation.isRequiredText(user.email) && validation.isEmail(user.email))
    ) {
      errors.push("The email is required and must match the pattern a@a.com.");
    }

    if (!validation.isPositiveNumber(user.profile)) {
      errors.push("The profile is required.");
    }

    if (!validation.isBoolean(user.active)) {
      errors.push("You must specify if the user is active or not.");
    }

    return errors;
  }
};
