const { TIMEOUT } = require("dns");

class RecruitementPage {
    constructor(page) {
        this.page = page;
        this.addCandidateButton = page.locator("button:has-text('Add')");
        this.firstNameInput = page.locator('input[placeholder="First Name"]');
        this.middleNameInput = page.locator('input[placeholder="Middle Name"]');
        this.lastNameInput = page.locator('input[placeholder="Last Name"]');
        this.vacancyDropdown = page.locator("form i").first();
        this.emailInput = page.getByRole("textbox").nth(2);
        this.contactnumberInput = page.getByRole("textbox").nth(3);
        this.resumeInput = page.locator('input[placeholder="No file selected"]');
        this.keywordsInput = page.locator('input[placeholder="Enter comma seperated words..."]');
        this.dateOfApplication = page.getByRole("textbox").nth(4);
        this.notesInput = page.getByRole("textbox").nth(5);
        this.checkbox = page.locator('input[type="checkbox"]');
        this.saveButton = page.locator('button:has-text("Save")');
    }
}


module.exports = { RecruitmentPage };