const httpResponse = require("../util/httpResponse.js");
const Referent = require("../models/referentModel.js");
const RfOrganismRf = require("../models/referentToOrganismRfModel");
const validation = require("../util/fieldValidations");

module.exports = class ReferentController {
  constructor() {
    this.model = new Referent();
    this.referent_list = this.referent_list.bind(this);
    this.referent_detail = this.referent_detail.bind(this);
    this.referent_create = this.referent_create.bind(this);
    this.referent_update = this.referent_update.bind(this);
    this.referent_delete = this.referent_delete.bind(this);
  }

  referent_list(request, response) {
    const id = parseInt(request.query.id);

    this.getAll(id)
      .then(list => httpResponse.okRequest(response, list))
      .catch(error => httpResponse.serverError(response, error));
  }

  getAll(id) {
    return this.model.getAll(id);
  }

  referent_detail(request, response) {
    const id = parseInt(request.query.id);

    const errors = this.isIDValid(id);

    if (errors.length === 0) {
      this.get(id)
        .then(referent => {
          if (!referent) {
            return httpResponse.badRequest(response, "No referent found");
          } else {
            return httpResponse.okRequest(response, referent);
          }
        })
        .catch(errors => httpResponse.serverError(response, errors));
    } else {
      return httpResponse.badRequest(response, errors);
    }
  }

  get(id) {
    return this.model.get(id);
  }

  referent_create(request, response) {
    const referent = {
      id: 0,
      lastName: request.body.referent.lastname,
      firstName: request.body.referent.firstname,
      title: request.body.referent.title,
      phone: request.body.referent.phone,
      officePhone: request.body.referent.officePhone,
      fax: request.body.referent.fax,
      email: request.body.referent.email,
      prefFax: request.body.referent.prefFax,
      prefEmail: request.body.referent.prefEmail,
      prefPaper: request.body.referent.prefPaper,
      organismsReferents: request.body.referent.organismsReferents
    };

    const errors = this.isReferentValid(referent);
    if (errors.length === 0) {
      this.create(referent)
        .then(rowID =>
          this.findByEmail(referent.email)
            .then(referent => httpResponse.okRequest(response, referent))
            .catch(errors => httpResponse.serverError(response, errors))
        )
        .catch(errors => {
          httpResponse.serverError(response, errors);
        });
    } else {
      return httpResponse.badRequest(response, errors);
    }
  }

  create(referent) {
    return this.model.create(referent);
  }

  referent_update(request, response) {
    const referent = {
      id: parseInt(request.query.id),
      lastName: request.body.referent.lastname,
      firstName: request.body.referent.firstname,
      title: request.body.referent.title,
      phone: request.body.referent.phone,
      officePhone: request.body.referent.officePhone,
      fax: request.body.referent.fax,
      email: request.body.referent.email,
      prefFax: request.body.referent.prefFax,
      prefEmail: request.body.referent.prefEmail,
      prefPaper: request.body.referent.prefPaper,
      organismsReferents: request.body.referent.organismsReferents
    };

    const errors = this.isReferentValid(referent);

    if (errors.length === 0) {
      this.update(referent)
        .then(rowID =>
          this.get(referent.id)
            .then(referent => httpResponse.okRequest(response, referent))
            .catch(error => httpResponse.serverError(response, error))
        )
        .catch(error => {
          httpResponse.serverError(response, error);
        });
    } else {
      return httpResponse.badRequest(response, errors);
    }
  }

  update(referent) {
    return this.model.update(referent);
  }

  referent_delete(request, response) {
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

  remove(id) {
    return this.model.remove(id);
  }

  findByEmail(email) {
    return this.model.findByEmail(email);
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

  isReferentValid(referent) {
    let errors = [];

    if (!validation.isPositiveNumber(referent.id)) {
      errors.push("The ID is required and must be positive.");
    }

    if (!validation.isRequiredText(referent.lastName)) {
      errors.push("The lastname is required");
    }

    if (!validation.isRequiredText(referent.firstName)) {
      errors.push("The firstname is required");
    }

    if (!validation.isRequiredText(referent.title)) {
      errors.push("The title is required");
    }

    if (
      !(
        validation.isOptionalText(referent.phone) ||
        validation.isPhone(referent.phone)
      )
    ) {
      errors.push(
        "If specified, the phone number must match a pattern 111-111-1111."
      );
    }

    if (
      !(
        validation.isOptionalText(referent.officePhone) ||
        validation.isPhone(referent.officePhone)
      )
    ) {
      errors.push(
        "If specified, the office phone number must match a pattern 111-111-1111."
      );
    }

    if (
      !(
        validation.isOptionalText(referent.fax) ||
        validation.isPhone(referent.fax)
      )
    ) {
      errors.push(
        "If specified, the fax number must match a pattern 111-111-1111."
      );
    }

    if (
      !(
        validation.isOptionalText(referent.email) ||
        validation.isEmail(referent.email)
      )
    ) {
      errors.push("If specified, the email must match a pattern a@a.a.");
    }

    if (!validation.isBoolean(referent.prefFax)) {
      errors.push(
        "You must specify if the referent preference fax is active or not."
      );
    }

    if (!validation.isBoolean(referent.prefEmail)) {
      errors.push(
        "You must specify if the referent preference email is active or not."
      );
    }

    if (!validation.isBoolean(referent.prefPaper)) {
      errors.push(
        "You must specify if the referent preference paper is active or not."
      );
    }

    return errors;
  }
};
