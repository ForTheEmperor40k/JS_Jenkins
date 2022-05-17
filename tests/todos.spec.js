import { expect } from "chai";
import { clearLocalStorage, openUrl } from "../core/browser";
import { logStep } from "../core/logger";
import { getRandomNumber } from "../helpers/numbersUtils";
import { generateBigString, generateString } from "../helpers/stringUtils";
import { TodosPage } from "../pages"

const testData = require("../resources/testData.json");
const emptyString = "";

describe("Todos field", async () => {

    beforeEach("Preconditions", async () => {
        await openUrl("");
    })

    afterEach("Postconditions", async () => {
        await clearLocalStorage();
    })

    it("Add new todos", async () => {
        logStep(`User enters a text into the task text field`);
        let task = await generateString();
        await TodosPage.waitUntilNewTodoFieldToBeDisplayed();
        await TodosPage.setNewTodoText(task);
        await TodosPage.pressEnterInInputBox();

        logStep(`Checking if the element has been added`);
        await TodosPage.waitUntilTodoListToBeDisplayed();
        expect(await TodosPage.isElementPresent(task),
            "Element was not found")
            .to.be.true;
    })

    it("Add new todos by click", async () => {
        logStep(`User enters a text into the task text field and clicks on lable`);
        let task = await generateString();
        await TodosPage.waitUntilNewTodoFieldToBeDisplayed();
        await TodosPage.setNewTodoText(task);
        await TodosPage.clickTodosLabel();

        logStep(`Checking if the element has been added`);
        await TodosPage.waitUntilTodoListToBeDisplayed();
        expect(await TodosPage.isElementPresent(task),
            "Element was not found")
            .to.be.true;
    })

    it("Correct order of tasks", async () => {
        logStep(`User enters ${testData.countOfTasks} tasks`);
        await TodosPage.waitUntilNewTodoFieldToBeDisplayed();
        let newTasks = [];
        for (let index = 0; index < testData.countOfTasks; index++) {
            newTasks[index] = await generateString();
            await TodosPage.setNewTodoText(newTasks[index]);
            await TodosPage.pressEnterInInputBox();
        }

        logStep(`Checking that elements are added in the order they were added`);
        expect(await TodosPage.getListOfTasks(), "Order is not correct").to.be.eql(newTasks);
    })

    it("Empty lines are not added", async () => {
        logStep(`The user does not type characters, but presses enter`);
        await TodosPage.waitUntilNewTodoFieldToBeDisplayed();
        await TodosPage.clickNewTodoTextField();
        await TodosPage.pressEnterInInputBox();

        logStep(`Check taht task list is not exist`);
        expect(await TodosPage.isTaskListExist(),
        "Task list is not empty")
        .to.be.false;
    })

    it(`New task could contain ${testData.borderCharacters} characters`, async () => {
        logStep(`The user enters a string equal to or greater than ${testData.borderCharacters} characters`);
        await TodosPage.waitUntilNewTodoFieldToBeDisplayed();
        let task = await generateBigString(testData.borderCharacters);
        await TodosPage.setNewTodoText(task);
        await TodosPage.pressEnterInInputBox();

        logStep("Checking if the line was added correctly");
        expect(await TodosPage.isElementPresent(task),
            "Element was not found")
            .to.be.true;
    })
});

describe("[Toggle all] button", async () => {

    beforeEach("Preconditions", async () => {
        await openUrl("");
    })

    afterEach("Postconditions", async () => {
        await clearLocalStorage();
    })

    it("The [Toggle all] button should not be displayed", async () => {
        logStep(`Check that without tasks the [Toggle all] button is not displayed`);
        expect(await TodosPage.isTaskListExist(),
        "Task list is not empty")
        .to.be.false;
        await TodosPage.waitUntilToggleAllButtonToBeNotDisplayed();
    })

    it("Switch status of tasks", async () => {
        logStep(`User enters ${testData.countOfTasks} tasks`);
        await TodosPage.waitUntilNewTodoFieldToBeDisplayed();
        for (let index = 0; index < testData.countOfTasks; index++) {
            await TodosPage.setNewTodoText(await generateString());
            await TodosPage.pressEnterInInputBox();
        }

        logStep("Verify that tasks don't have a completed status");
        expect(await TodosPage.isAllTasksStatusBe(emptyString), 
            "At least one tasks have a completed status")
            .to.be.true;

        logStep("User toggles all status by button");
        await TodosPage.clickToggleAllButton();

        logStep("Verify that tasks have a completed status");
        expect(await TodosPage.isAllTasksStatusBe(testData.completedStatus),
            "At least one tasks dosen't have a completed status")
            .to.be.true;
    })

    it("Toggle task status with one already completed task", async () => {
        logStep(`User enters ${testData.countOfTasks} tasks`);
        await TodosPage.waitUntilNewTodoFieldToBeDisplayed();
        for (let index = 0; index < testData.countOfTasks; index++) {
            await TodosPage.setNewTodoText(await generateString());
            await TodosPage.pressEnterInInputBox();
        }

        logStep(`User sets one of the ${testData.countOfTasks} tasks status completed`);
        let tasks = await TodosPage.getListOfTasks();
        let taskNumber = await getRandomNumber(tasks.length);
        await TodosPage.clickToggleTaskButtonByNumber(taskNumber);

        logStep(`Verify that there us task with the status completed`);
        expect(await TodosPage.isTaskStatusByNumberBe(taskNumber, testData.completedStatus),
            "At least one tasks dosen't have a completed status")
            .to.be.true;

        await logStep("User toggles all status by button");
        await TodosPage.clickToggleAllButton();

        logStep("Verify that tasks have a completed status");
        expect(await TodosPage.isAllTasksStatusBe(testData.completedStatus),
            "At least one tasks dosen't have a completed status")
            .to.be.true;
    })
});

describe("[Toggle task] button", async () => {

    beforeEach("Preconditions", async () => {
        await openUrl("");
    })

    afterEach("Postconditions", async () => {
        await clearLocalStorage();
    })

    it("Switch task as completed", async () => {
        logStep(`User enters a task`);
        await TodosPage.waitUntilNewTodoFieldToBeDisplayed();
        await TodosPage.setNewTodoText(await generateString());
        await TodosPage.pressEnterInInputBox();

        logStep("Verify that tasks don't have a completed status");
        expect(await TodosPage.isAllTasksStatusBe(emptyString), 
            "At least one tasks have a completed status")
            .to.be.true;

        logStep("User toggle task to complete");
        await TodosPage.clickToggleTaskButtonByNumber((await TodosPage.getListOfTasks()).length - 1);

        logStep("Verify that tasks have a completed status");
        expect(await TodosPage.isAllTasksStatusBe(testData.completedStatus),
            "At least one tasks dosen't have a completed status")
            .to.be.true;
    })

    it("Switch task as completed and back", async () => {
        logStep(`User enters a task`);
        await TodosPage.waitUntilNewTodoFieldToBeDisplayed();
        await TodosPage.setNewTodoText(await generateString());
        await TodosPage.pressEnterInInputBox();

        logStep("User toggle task to complete");
        await TodosPage.clickToggleTaskButtonByNumber((await TodosPage.getListOfTasks()).length - 1);

        logStep("Verify that tasks have a completed status");
        expect(await TodosPage.isAllTasksStatusBe(testData.completedStatus),
            "At least one tasks dosen't have a completed status")
            .to.be.true;

        logStep("User toggle task to complete");
        await TodosPage.clickToggleTaskButtonByNumber((await TodosPage.getListOfTasks()).length - 1);

        logStep("Verify that tasks don't have a completed status");
        expect(await TodosPage.isAllTasksStatusBe(emptyString), 
            "At least one tasks have a completed status")
            .to.be.true;
    })
});

describe("[Remove task] button", async () => {

    beforeEach("Preconditions", async () => {
        await openUrl("");
    })

    afterEach("Postconditions", async () => {
        await clearLocalStorage();
    })

    it("Delete task", async () => {
        logStep(`User enters a task`);
        await TodosPage.waitUntilNewTodoFieldToBeDisplayed();
        await TodosPage.setNewTodoText(await generateString());
        await TodosPage.pressEnterInInputBox();

        logStep("Check that task list is exist");
        expect(await TodosPage.isTaskListExist(),
        "Task list is empty")
        .to.be.true;

        logStep("User deletes the task");
        await TodosPage.hoverOverTaskByNumber((await TodosPage.getListOfTasks()).length - 1);
        await TodosPage.clickDeleteTaskByNumberButton((await TodosPage.getListOfTasks()).length - 1);

        logStep("Check the items in the list don't exist");
        expect(await TodosPage.isTaskListExist(),
        "Task list is not empty")
        .to.be.false;
    })
});

describe("[Counter] lable", async () => {

    beforeEach("Preconditions", async () => {
        await openUrl("");
    })

    afterEach("Postconditions", async () => {
        await clearLocalStorage();
    })

    it("The counter is not displayed without entries", async () => {
        logStep("Check that the task list is empty");
        expect(await TodosPage.isTaskListExist(),
            "Task list is not empty")
            .to.be.false;

        logStep("Check that the counter is not displayed");
        await TodosPage.waitUntiltaskCounterToBeNotDisplayed();
    })

    it("The counter displays the actual number of tasks", async () => {
        logStep(`User enters ${testData.countOfTasks} tasks`);
        await TodosPage.waitUntilNewTodoFieldToBeDisplayed();
        for (let index = 0; index < testData.countOfTasks; index++) {
            await TodosPage.setNewTodoText(await generateString());
            await TodosPage.pressEnterInInputBox();
        }

        logStep("Check that the counter displays actual number of tasks");
        let tasks = await TodosPage.getListOfTasks();
        expect(Number(await TodosPage.getTaskCounterText()),
            "The number of tasks does not match the counter value")
            .to.be.equal(tasks.length);

        logStep(`User sets one of the ${testData.countOfTasks} tasks status completed`);
        await TodosPage.clickToggleTaskButtonByNumber(await getRandomNumber(tasks.length));

        logStep("Check that counter has decreased by one");
        expect(Number(await TodosPage.getTaskCounterText()),
            "The number of tasks does not match the counter value")
            .to.be.equal(tasks.length - 1);

        logStep("Getting indexes of uncompleted tasks. User deletes one of these tasks");
        let uncompletedTasks = await TodosPage.getIndexesOfTasksByStatus();
        let randomTask = await getRandomNumber(uncompletedTasks.length);
        await TodosPage.hoverOverTaskByNumber(uncompletedTasks[randomTask]);
        await TodosPage.clickDeleteTaskByNumberButton(uncompletedTasks[randomTask]);

        logStep("Check that counter has decreased by one");
        expect(Number(await TodosPage.getTaskCounterText()),
            "The number of tasks does not match the counter value")
            .to.be.equal((await TodosPage.getListOfTasks()).length - 1);
    })
});

describe("[Clear completed] button", async () => {

    beforeEach("Preconditions", async () => {
        await openUrl("");
    })

    afterEach("Postconditions", async () => {
        await clearLocalStorage();
    })

    it("The button should not be displayed without completed tasks", async () => {
        logStep(`User enters ${testData.countOfTasks} tasks`);
        await TodosPage.waitUntilNewTodoFieldToBeDisplayed();
        for (let index = 0; index < testData.countOfTasks; index++) {
            await TodosPage.setNewTodoText(await generateString());
            await TodosPage.pressEnterInInputBox();
        }

        logStep("Verify that tasks don't have a completed status");
        expect(await TodosPage.isAllTasksStatusBe(emptyString),
            "At least one tasks have a completed status")
            .to.be.true;

        logStep("Check that the button is not displayed");
        await TodosPage.waitUntilClearTasksButtonToBeNotDisplayed();
    })

    it("The button should clean completed tasks", async () => {
        logStep(`User enters ${testData.countOfTasks} tasks`);
        await TodosPage.waitUntilNewTodoFieldToBeDisplayed();
        for (let index = 0; index < testData.countOfTasks; index++) {
            await TodosPage.setNewTodoText(await generateString());
            await TodosPage.pressEnterInInputBox();
        }

        logStep(`User sets all of the ${testData.countOfTasks} tasks status completed except one`);
        let tasks = await TodosPage.getIndexesOfTasksByStatus();
        let taskExceptionIndex = await getRandomNumber(tasks.length);
        for (let index = 0; index < tasks.length; index++) {
            if(index == taskExceptionIndex){
                continue;
            }
            await TodosPage.clickToggleTaskButtonByNumber(index);
        }

        logStep("User clicks the clear completed tasks button");
        await TodosPage.clickClearCompletedTasksButton();

        logStep(`Check that the button is not displayed and list of tasks
            has no completed tasks`);
        await TodosPage.waitUntilClearTasksButtonToBeNotDisplayed();
        expect(await TodosPage.isAllTasksStatusBe(emptyString),
            "At least one tasks dosen't have a completed status")
            .to.be.true;
    })
});

describe("View buttons", async () => {

    beforeEach("Preconditions", async () => {
        await openUrl("");
    })

    afterEach("Postconditions", async () => {
        await clearLocalStorage();
    })

    it("The [All] button should display all records", async () => {
        logStep(`User enters ${testData.countOfTasks} tasks`);
        await TodosPage.waitUntilNewTodoFieldToBeDisplayed();
        for (let index = 0; index < testData.countOfTasks; index++) {
            await TodosPage.setNewTodoText(await generateString());
            await TodosPage.pressEnterInInputBox();
        }
        let tasks = await TodosPage.getListOfTasks();

        logStep(`User sets one of the ${testData.countOfTasks} tasks status completed`);
        await TodosPage.clickToggleTaskButtonByNumber(await getRandomNumber(tasks.length));

        logStep("Check that display all filter is selected");
        expect(await TodosPage.isAllFilterSelected(), 
            "Display all filter not selected")
            .to.be.true;

        logStep("Check that all records are displayed");
        expect((await TodosPage.getListOfTasks()).length,
            "The number of tasks does not match")
            .to.be.equal(tasks.length);
    })

    it("The [Active] button should display all active records", async () => {
        logStep(`User enters ${testData.countOfTasks} tasks`);
        await TodosPage.waitUntilNewTodoFieldToBeDisplayed();
        for (let index = 0; index < testData.countOfTasks; index++) {
            await TodosPage.setNewTodoText(await generateString());
            await TodosPage.pressEnterInInputBox();
        }
        let tasks = await TodosPage.getListOfTasks();

        logStep(`User sets one of the ${testData.countOfTasks} tasks status completed`);
        await TodosPage.clickToggleTaskButtonByNumber(await getRandomNumber(tasks.length));

        logStep("User selects the active filter. Check that display active filter is selected");
        await TodosPage.clickActiveFilter();
        expect(await TodosPage.isActiveFilterSelected(), 
            "Display active tasks filter not selected")
            .to.be.true;

        logStep("Verify that tasks don't have a completed status");
        expect(await TodosPage.isAllTasksStatusBe(emptyString), 
            "At least one tasks have a completed status")
            .to.be.true;
    })

    it("The [Completed] button should display all completed records", async () => {
        logStep(`User enters ${testData.countOfTasks} tasks`);
        await TodosPage.waitUntilNewTodoFieldToBeDisplayed();
        for (let index = 0; index < testData.countOfTasks; index++) {
            await TodosPage.setNewTodoText(await generateString());
            await TodosPage.pressEnterInInputBox();
        }
        let tasks = await TodosPage.getListOfTasks();

        logStep(`User sets one of the ${testData.countOfTasks} tasks status completed`);
        await TodosPage.clickToggleTaskButtonByNumber(await getRandomNumber(tasks.length));

        logStep("User selects the completed filter. Check that display completed filter is selected");
        await TodosPage.clickCompletedFilter();
        expect(await TodosPage.isCompletedFilterSelected(), 
            "Display completed tasks filter not selected")
            .to.be.true;

        logStep("Verify that tasks have a completed status");
        expect(await TodosPage.isAllTasksStatusBe(testData.completedStatus), 
            "At least one tasks have a completed status")
            .to.be.true;
    })
});