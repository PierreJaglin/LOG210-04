const httpResponse = require("../util/httpResponse.js");
const ServicePoint = require("../models/servicePointModel.js");
const validation = require("../util/fieldValidations");

module.exports = class ServicePointController {
  constructor() {
    this.model = new ServicePoint();
    this.servicePoint_list = this.servicePoint_list.bind(this);
    this.servicePoint_detail = this.servicePoint_detail.bind(this);
    this.servicePoint_create = this.servicePoint_create.bind(this);
    this.servicePoint_update = this.servicePoint_update.bind(this);
    this.servicePoint_delete = this.servicePoint_delete.bind(this);
  }

  servicePoint_list(request, response) {
    const active = !!request.query.active;
    const id = parseInt(request.query.id);

    this.getAll(id, active)
      .then(list => httpResponse.okRequest(response, list))
      .catch(error => httpResponse.serverError(response, error));
  }

  servicePoint_detail(request, response) {
    const id = parseInt(request.query.id);

    const errors = this.isIDValid(id);

    if (errors.length === 0) {
      this.get(id)
        .then(servicePoint => {
          if (!servicePoint) {
            return httpResponse.badRequest(response, "No service point found");
          } else {
            return httpResponse.okRequest(response, servicePoint);
          }
        })
        .catch(error => httpResponse.serverError(response, error));
    } else {
      return httpResponse.badRequest(response, errors);
    }
  }

  servicePoint_create(request, response) {
    const servicePoint = {
      id: 0,
      name: request.body.servicePoint.name,
      address: {
        number: parseInt(request.body.servicePoint.addressNumber),
        street: request.body.servicePoint.street,
        city: request.body.servicePoint.city,
        province: request.body.servicePoint.province,
        postalCode: request.body.servicePoint.postalCode
      },
      active: request.body.servicePoint.active,
      phone: request.body.servicePoint.phone,
      fax: request.body.servicePoint.fax,
      email: request.body.servicePoint.email,
      organism: request.body.servicePoint.organism
    };

    const errors = this.isServicePointValid(servicePoint);

    if (errors.length === 0) {
      this.create(servicePoint)
        .then(rowID =>
          this.find(servicePoint.name)
            .then(servicePoint =>
              httpResponse.okRequest(response, servicePoint)
            )
            .catch(error => httpResponse.serverError(response, error))
        )
        .catch(error => {
          httpResponse.serverError(response, error);
        });
    } else {
      return httpResponse.badRequest(response, errors);
    }
  }

  servicePoint_update(request, response) {
    const servicePoint = {
      id: parseInt(request.query.id),
      name: request.body.servicePoint.name,
      address: {
        number: parseInt(request.body.servicePoint.addressNumber),
        street: request.body.servicePoint.street,
        city: request.body.servicePoint.city,
        province: request.body.servicePoint.province,
        postalCode: request.body.servicePoint.postalCode
      },
      active: request.body.servicePoint.active,
      phone: request.body.servicePoint.phone,
      fax: request.body.servicePoint.fax,
      email: request.body.servicePoint.email,
      organism: request.body.servicePoint.organism
    };

    const errors = this.isServicePointValid(servicePoint);

    if (errors.length === 0) {
      this.update(servicePoint)
        .then(rowID =>
          this.get(servicePoint.id)
            .then(servicePoint =>
              httpResponse.okRequest(response, servicePoint)
            )
            .catch(error => httpResponse.serverError(response, error))
        )
        .catch(error => {
          console.log(error);
          httpResponse.serverError(response, error);
        });
    } else {
      return httpResponse.badRequest(response, errors);
    }
  }

  servicePoint_delete(request, response) {
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

  getAll(id, active) {
    return this.model.getAll(id, active);
  }

  find(name) {
    return this.model.find(name);
  }

  create(servicePoint) {
    return this.model.create(servicePoint);
  }

  update(servicePoint) {
    return this.model.update(servicePoint);
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

  isServicePointValid(servicePoint) {
    let errors = [];

    if (!validation.isPositiveNumber(servicePoint.id)) {
      errors.push("The ID is required and must be positive.");
    }

    if (!validation.isRequiredText(servicePoint.name)) {
      errors.push("The name is required.");
    }

    if (!validation.isPositiveNumber(servicePoint.address.number)) {
      errors.push("The address number is required and must be positive.");
    }

    if (!validation.isRequiredText(servicePoint.address.street)) {
      errors.push("The street name is required.");
    }

    if (!validation.isRequiredText(servicePoint.address.city)) {
      errors.push("The city name is required.");
    }

    if (!validation.isRequiredText(servicePoint.address.province)) {
      errors.push("The province name is required.");
    }

    if (!validation.isPostalCode(servicePoint.address.postalCode)) {
      errors.push(
        "The postal code is required and must match a pattern A1A1A1."
      );
    }

    if (
      !(
        validation.isOptionalText(servicePoint.phone) ||
        validation.isPhone(servicePoint.phone)
      )
    ) {
      errors.push(
        "If specified, the phone number must match a pattern 111-111-1111."
      );
    }

    if (
      !(
        validation.isOptionalText(servicePoint.fax) ||
        validation.isPhone(servicePoint.fax)
      )
    ) {
      errors.push(
        "If specified, the fax number must match a pattern 111-111-1111."
      );
    }

    if (
      !(
        validation.isOptionalText(servicePoint.email) ||
        validation.isEmail(servicePoint.email)
      )
    ) {
      errors.push("If specified, the email must match a pattern a@a.a.");
    }

    if (!validation.isPositiveNumber(servicePoint.organism)) {
      errors.push("The organism must be specified.");
    }

    if (!validation.isBoolean(servicePoint.active)) {
      errors.push("You must specify if the service point is active or not.");
    }

    return errors;
  }
};
