const httpResponse = require("../util/httpResponse.js");
const Organism = require("../models/organismModel.js");
const validation = require("../util/fieldValidations");

module.exports = class OrganismController {
  constructor() {
    this.model = new Organism();
    this.organism_list = this.organism_list.bind(this);
    this.organism_detail = this.organism_detail.bind(this);
    this.organism_create = this.organism_create.bind(this);
    this.organism_update = this.organism_update.bind(this);
    this.organism_delete = this.organism_delete.bind(this);
  }

  organism_list(request, response) {
    const active = !!request.query.active;
    this.getAll(active)
      .then(list => httpResponse.okRequest(response, list))
      .catch(error => httpResponse.serverError(response, error));
  }

  organism_detail(request, response) {
    const id = parseInt(request.query.id);

    const errors = this.isIDValid(id);

    if (errors.length === 0) {
      this.get(id)
        .then(organism => {
          if (!organism) {
            return httpResponse.badRequest(response, "No organism found");
          } else {
            return httpResponse.okRequest(response, organism);
          }
        })
        .catch(error => httpResponse.serverError(response, error));
    } else {
      return httpResponse.badRequest(response, errors);
    }
  }

  organism_create(request, response) {
    const organism = {
      id: 0,
      name: request.body.organism.name,
      address: {
        number: parseInt(request.body.organism.addressNumber),
        street: request.body.organism.street,
        city: request.body.organism.city,
        province: request.body.organism.province,
        postalCode: request.body.organism.postalCode
      },
      active: request.body.organism.active,
      phone: request.body.organism.phone,
      fax: request.body.organism.fax,
      email: request.body.organism.email
    };

    const errors = this.isOrganismValid(organism);

    if (errors.length === 0) {
      this.create(organism)
        .then(rowID =>
          this.find(organism.name)
            .then(organism => httpResponse.okRequest(response, organism))
            .catch(error => httpResponse.serverError(response, error))
        )
        .catch(error => {
          httpResponse.serverError(response, error);
        });
    } else {
      return httpResponse.badRequest(response, errors);
    }
  }

  organism_update(request, response) {
    const organism = {
      id: parseInt(request.query.id),
      name: request.body.organism.name,
      address: {
        number: parseInt(request.body.organism.addressNumber),
        street: request.body.organism.street,
        city: request.body.organism.city,
        province: request.body.organism.province,
        postalCode: request.body.organism.postalCode
      },
      active: request.body.organism.active,
      phone: request.body.organism.phone,
      fax: request.body.organism.fax,
      email: request.body.organism.email
    };

    const errors = this.isOrganismValid(organism);

    if (errors.length === 0) {
      this.update(organism)
        .then(rowID =>
          this.get(organism.id)
            .then(organism => httpResponse.okRequest(response, organism))
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

  organism_delete(request, response) {
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

  getAll(active) {
    return this.model.getAll(active);
  }

  find(name) {
    return this.model.find(name);
  }

  create(organism) {
    return this.model.create(organism);
  }

  update(organism) {
    return this.model.update(organism);
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

  isOrganismValid(organism) {
    let errors = [];

    if (!validation.isPositiveNumber(organism.id)) {
      errors.push("The ID is required and must be positive.");
    }

    if (!validation.isRequiredText(organism.name)) {
      errors.push("The name is required.");
    }

    if (!validation.isPositiveNumber(organism.address.number)) {
      errors.push("The address number is required and must be positive.");
    }

    if (!validation.isRequiredText(organism.address.street)) {
      errors.push("The street name is required.");
    }

    if (!validation.isRequiredText(organism.address.city)) {
      errors.push("The city name is required.");
    }

    if (!validation.isRequiredText(organism.address.province)) {
      errors.push("The province name is required.");
    }

    if (!validation.isPostalCode(organism.address.postalCode)) {
      errors.push(
        "The postal code is required and must match a pattern A1A1A1."
      );
    }

    if (
      !(
        validation.isOptionalText(organism.phone) ||
        validation.isPhone(organism.phone)
      )
    ) {
      errors.push(
        "If specified, the phone number must match a pattern 111-111-1111."
      );
    }

    if (
      !(
        validation.isOptionalText(organism.fax) ||
        validation.isPhone(organism.fax)
      )
    ) {
      errors.push(
        "If specified, the fax number must match a pattern 111-111-1111."
      );
    }

    if (
      !(
        validation.isOptionalText(organism.email) ||
        validation.isEmail(organism.email)
      )
    ) {
      errors.push("If specified, the email must match a pattern a@a.a.");
    }

    if (!validation.isBoolean(organism.active)) {
      errors.push("You must specify if the organism is active or not.");
    }

    return errors;
  }
};
