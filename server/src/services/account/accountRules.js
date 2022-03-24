module.exports = {
  async validateAccount(existingAccount, newAccount) {
    if (
      newAccount.login === existingAccount.login &&
      newAccount.email === existingAccount.email
    ) {
      throw new Error(
        "Falha ao cadastrar conta. Essa conta ja existe."
      );
    }

    if (newAccount.login === existingAccount.login) {
      throw new Error("Falha ao cadastrar conta. Login ja existe.");
    }

    if (newAccount.email === existingAccount.email) {
      throw new Error("Falha ao cadastrar conta. Email ja existe.");
    }
  },
};
