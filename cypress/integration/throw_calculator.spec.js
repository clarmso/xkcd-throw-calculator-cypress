/// <reference types="Cypress" />

import {results, custom} from "./results";

context("xkcd throw calculator", () => {
  before(() => {
    cy.visit("/");
  });
  Cypress._.keys(results).forEach(thrower => {
    it(`calculates how far can ${thrower} can throw objects`, () => {
      const objects = Cypress._.keys(results[thrower]);
      cy.get("div[role*='radiogroup']")
        .first()
        .contains("span", thrower)
        .click();
      objects.forEach(object => {
        cy.get("div[role*='radiogroup']")
          .last()
          .contains("span", object)
          .click();
        {
          thrower == object
            ? cy
                .contains(
                  `How far could ${thrower} throw ${
                    results[thrower][object]["pronoun"]
                  }?`
                )
                .should("be.visible")
            : cy
                .contains(
                  `How far could ${thrower} throw ${
                    Cypress._.split(object, " (")[0]
                  }?`
                )
                .should("be.visible");
        }
        {
          results[thrower][object]["meters"]
            ? (cy
                .contains(`${results[thrower][object]["meters"]} meters`)
                .should("be.visible"),
              cy
                .contains(
                  `(${results[thrower][object]["amount"]} ${
                    results[thrower][object]["unit"]
                  })`
                )
                .should("be.visible"))
            : cy.contains(`${thrower} cannot throw that.`).should("be.visible");
        }
      });
    });
  });
});
