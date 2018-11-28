const httpResponse = require("../util/httpResponse.js");
const Service = require("../models/serviceModel.js");
const validation = require("../util/fieldValidations");

module.exports = class ServiceController {
  constructor() {
    this.model = new Service();
    this.service_list = this.service_list.bind(this);
    this.service_detail = this.service_detail.bind(this);
    this.service_create = this.service_create.bind(this);
    this.service_update = this.service_update.bind(this);
    this.service_delete = this.service_delete.bind(this);
  }

  service_list(request, response) {
    const id = parseInt(request.query.id);

    this.getAll(id)
      .then(list => httpResponse.okRequest(response, list))
      .catch(error => httpResponse.serverError(response, error));
  }

  service_detail(request, response) {
    const id = parseInt(request.query.id);

    const errors = this.isIDValid(id);

    if (errors.length === 0) {
      this.get(id)
        .then(service => {
          if (!service) {
            return httpResponse.badRequest(response, "No service found");
          } else {
            return httpResponse.okRequest(response, service);
          }
        })
        .catch(error => httpResponse.serverError(response, error));
    } else {
      return httpResponse.badRequest(response, errors);
    }
  }

  service_create(request, response) {
    const service = {
      id: 0,
      name: request.body.service.name,
      description: request.body.service.description,
      parent: request.body.service.tarificationParent,
      subvention: request.body.service.tarificationSubventionee,
      cisss: request.body.service.tarificationCISSS,
      dateEntreeVigueur: request.body.service.dateEntreeVigueur,
      servicePoint: request.body.service.servicePoint,
      active: request.body.service.active
    };

    const errors = this.isServiceValid(service);

    if (errors.length === 0) {
      this.create(service)
        .then(rowID =>
          this.find(service.name)
            .then(service => httpResponse.okRequest(response, service))
            .catch(error => httpResponse.serverError(response, error))
        )
        .catch(error => {
          httpResponse.serverError(response, error);
        });
    } else {
      return httpResponse.badRequest(response, errors);
    }
  }

  service_update(request, response) {
    const service = {
      id: parseInt(request.query.id),
      name: request.body.service.name,
      description: request.body.service.description,
      parent: request.body.service.tarificationParent,
      subvention: request.body.service.tarificationSubventionee,
      cisss: request.body.service.tarificationCISSS,
      dateEntreeVigueur: request.body.service.dateEntreeVigueur,
      servicePoint: request.body.service.servicePoint,
      active: request.body.service.active
    };

    const errors = this.isServiceValid(service);

    if (errors.length === 0) {
      this.update(service)
        .then(rowID =>
          this.get(service.id)
            .then(service => httpResponse.okRequest(response, service))
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

  service_delete(request, response) {
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

  getAll(id) {
    return this.model.getAll(id);
  }

  find(name) {
    return this.model.find(name);
  }

  create(service) {
    return this.model.create(service);
  }

  update(service) {
    return this.model.update(service);
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

  isServiceValid(service) {
    let errors = [];

    if (!validation.isPositiveNumber(service.id)) {
      errors.push("The ID is required and must be positive.");
    }

    if (!validation.isRequiredText(service.name)) {
      errors.push("The name is required.");
    }

    if (!validation.isBoolean(service.active)) {
      errors.push("You must specify if the service is active or not.");
    }

    return errors;
  }
};
