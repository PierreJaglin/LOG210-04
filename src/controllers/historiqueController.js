const httpResponse = require("../util/httpResponse.js");
const Historique = require("../models/historiqueTarificationServiceModel");

module.exports = class HistoriqueController {
  constructor() {
    this.model = new Historique();
    this.historique_list = this.historique_list.bind(this);
  }

  historique_list(request, response) {
    this.getAll()
      .then(list => httpResponse.okRequest(response, list))
      .catch(error => httpResponse.serverError(response, error));
  }

  getAll() {
    return this.model.getAll();
  }
};
