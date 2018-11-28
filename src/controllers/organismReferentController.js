const OrganismReferent = require("../models/organismReferentModel.js");
const httpResponse = require("../util/httpResponse.js");
const validation = require("../util/fieldValidations");

module.exports = class OrganismReferentController {
  constructor() {
    this.model = new OrganismReferent();
    this.organismReferent_list = this.organismReferent_list.bind(this);
    this.organismReferent_listByOrganism = this.organismReferent_listByOrganism.bind(
      this
    );
    this.organismReferent_detail = this.organismReferent_detail.bind(this);
    this.organismReferent_create = this.organismReferent_create.bind(this);
    this.organismReferent_update = this.organismReferent_update.bind(this);
    this.organismReferent_delete = this.organismReferent_delete.bind(this);
  }

  organismReferent_list(request, response) {
    const active = !!request.query.active;
    this.getAll(active)
      .then(list => httpResponse.okRequest(response, list))
      .catch(error => httpResponse.serverError(response, error));
  }

  organismReferent_listByOrganism(request, response) {
    const id = parseInt(request.query.id);

    const errors = this.isIDValid(id);

    if (errors.length === 0) {
      this.getAllByOrganism(id)
        .then(list => httpResponse.okRequest(response, list))
        .catch(error => httpResponse.serverError(response, error));
    } else {
      return httpResponse.badRequest(response, errors);
    }
  }

  organismReferent_detail(request, response) {
    const id = parseInt(request.query.id);

    const errors = this.isIDValid(id);

    if (errors.length === 0) {
      this.get(id)
        .then(organismReferent => {
          if (!organismReferent) {
            return httpResponse.badRequest(
              response,
              "No organism referent found"
            );
          } else {
            return httpResponse.okRequest(response, organismReferent);
          }
        })
        .catch(error => httpResponse.serverError(response, error));
    } else {
      return httpResponse.badRequest(response, errors);
    }
  }

  organismReferent_create(request, response) {
    const organismReferent = {
      id: 0,
      name: request.body.organismReferent.name,
      address: {
        number: parseInt(request.body.organismReferent.addressNumber),
        street: request.body.organismReferent.street,
        city: request.body.organismReferent.city,
        province: request.body.organismReferent.province,
        postalCode: request.body.organismReferent.postalCode
      },
      active: request.body.organismReferent.active,
      phone: request.body.organismReferent.phone,
      fax: request.body.organismReferent.fax,
      email: request.body.organismReferent.email,
      website: request.body.organismReferent.website,
      organism: request.body.organismReferent.organism
    };

    const errors = this.isOrganismReferentValid(organismReferent);

    if (errors.length === 0) {
      this.create(organismReferent)
        .then(rowID =>
          this.find(organismReferent.name)
            .then(organismReferent =>
              httpResponse.okRequest(response, organismReferent)
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

  organismReferent_update(request, response) {
    const organismReferent = {
      id: parseInt(request.query.id),
      name: request.body.organismReferent.name,
      address: {
        number: parseInt(request.body.organismReferent.addressNumber),
        street: request.body.organismReferent.street,
        city: request.body.organismReferent.city,
        province: request.body.organismReferent.province,
        postalCode: request.body.organismReferent.postalCode
      },
      active: request.body.organismReferent.active,
      phone: request.body.organismReferent.phone,
      fax: request.body.organismReferent.fax,
      email: request.body.organismReferent.email,
      website: request.body.organismReferent.website,
      organism: request.body.organismReferent.organism
    };

    const errors = this.isOrganismReferentValid(organismReferent);

    if (errors.length === 0) {
      this.update(organismReferent)
        .then(rowID =>
          this.get(organismReferent.id)
            .then(organismReferent =>
              httpResponse.okRequest(response, organismReferent)
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

  organismReferent_delete(request, response) {
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

  find(name) {
    return this.model.find(name);
  }

  getAll(active) {
    return this.model.getAll(active);
  }

  getAllByOrganism(organismID) {
    return this.model.getAllByOrganism(organismID);
  }

  create(organismReferent) {
    return this.model.create(organismReferent);
  }

  update(organismReferent) {
    return this.model.update(organismReferent);
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

  isOrganismReferentValid(organismReferent) {
    let errors = [];

    if (!validation.isPositiveNumber(organismReferent.id)) {
      errors.push("The ID is required and must be positive.");
    }

    if (!validation.isRequiredText(organismReferent.name)) {
      errors.push("The name is required.");
    }

    if (!validation.isPositiveNumber(organismReferent.address.number)) {
      errors.push("The address number is required and must be positive.");
    }

    if (!validation.isRequiredText(organismReferent.address.street)) {
      errors.push("The street name is required.");
    }

    if (!validation.isRequiredText(organismReferent.address.city)) {
      errors.push("The city name is required.");
    }

    if (!validation.isRequiredText(organismReferent.address.province)) {
      errors.push("The province name is required.");
    }

    if (!validation.isPostalCode(organismReferent.address.postalCode)) {
      errors.push(
        "The postal code is required and must match a pattern A1A1A1."
      );
    }

    if (
      !(
        validation.isOptionalText(organismReferent.phone) ||
        validation.isPhone(organismReferent.phone)
      )
    ) {
      errors.push(
        "If specified, the phone number must match a pattern 111-111-1111."
      );
    }

    if (
      !(
        validation.isOptionalText(organismReferent.fax) ||
        validation.isPhone(organismReferent.fax)
      )
    ) {
      errors.push(
        "If specified, the fax number must match a pattern 111-111-1111."
      );
    }

    if (
      !(
        validation.isOptionalText(organismReferent.email) ||
        validation.isEmail(organismReferent.email)
      )
    ) {
      errors.push("If specified, the email must match a pattern a@a.a.");
    }

    if (
      !(
        validation.isOptionalText(organismReferent.website) ||
        validation.isString(organismReferent.website)
      )
    ) {
      errors.push("If specified, the website must be a string.");
    }

    if (!validation.isPositiveNumber(organismReferent.organism)) {
      errors.push("The organism referent must be specified.");
    }

    if (!validation.isBoolean(organismReferent.active)) {
      errors.push(
        "You must specify if the organism referent is active or not."
      );
    }

    return errors;
  }
};
