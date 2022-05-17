import { Button, Label, TextField } from '../core/ui';
import { BasePage } from "../core/ui/BasePage.js";

let newTodoTextField = new TextField("//input[@class='new-todo']", "Todo field");
let todoList = new Label("//li[@data-id]", "Todo list");
let deleteTaskButton = new Button("//button[@class='destroy']", "Delete task field");
let toggleAllButton = new Button("//label[@for='toggle-all']", "Toggle all");
let toggleTaskButton = new Button("//input[@class='toggle']", "Toggle task");
let clearCompletedTasksButton = new Button("//button[@class='clear-completed']", "Clear tasks");
let allFilterLabel = new Label("//a[@href='#/']", "All");
let activeFilterLabel = new Label("//a[@href='#/active']", "Active");
let completedFilterLabel = new Label("//a[@href='#/completed']", "Completed");
let taskCounterLabel = new Label("//span[@class='todo-count']//strong", "Todo counter");
let todosHeaderLabel = new Label("//h1[text()='todos']", "Todos header");

const enterKey = "Enter";
const tasksStatusAttribute = "class";
const selected = "selected";

export class TodosPage extends BasePage {
    identifier = "//input[@class='new-todo']";

    async isCompletedFilterSelected() {
        if(await completedFilterLabel.getAttribute(tasksStatusAttribute) == selected) {
            return true;
        } 
        return false;
    }

    async clickCompletedFilter() {
        await completedFilterLabel.click();
    }

    async isActiveFilterSelected() {
        if(await activeFilterLabel.getAttribute(tasksStatusAttribute) == selected) {
            return true;
        } 
        return false;
    }

    async clickActiveFilter() {
        await activeFilterLabel.click();
    }

    async isAllFilterSelected() {
        if(await allFilterLabel.getAttribute(tasksStatusAttribute) == selected) {
            return true;
        } 
        return false;
    }

    async clickClearCompletedTasksButton() {
        await clearCompletedTasksButton.click();
    }

    async waitUntilClearTasksButtonToBeNotDisplayed() {
        await clearCompletedTasksButton.waitUntilVisible({ reverse: true });
    }

    async getIndexesOfTasksByStatus(status = "") {
        let tasks = [];
        for (let index = 0; index < await todoList.getCount(); index++) {
            let currentTask = new Label(await todoList.getElement(index), `${index} task from list`);
            if(await currentTask.getAttribute(tasksStatusAttribute) == status) {
                await tasks.push(index);
            }
        }
        return tasks;
    }

    async getTaskCounterText() {
        return await taskCounterLabel.getText();
    }

    async waitUntiltaskCounterToBeNotDisplayed() {
        await taskCounterLabel.waitUntilVisible({ reverse: true });
    }

    async hoverOverTaskByNumber(taskNumber) {
        let task = new Label(await todoList.getElement(taskNumber), "New task");
        await task.moveTo();
    }

    async clickDeleteTaskByNumberButton(taskNumber) {
        await (await deleteTaskButton.getElement(taskNumber)).click();
    }

    async clickToggleTaskButtonByNumber(taskNumber) {
        await (await toggleTaskButton.getElement(taskNumber)).click();
    }

    async clickToggleAllButton() {
        await toggleAllButton.click();
    }

    async isTaskStatusByNumberBe(taskNumber, status) {
        if(await (await todoList.getElement(taskNumber)).getAttribute(tasksStatusAttribute) != status) {
            return false;
        } else {
            return true;
        }
    }

    async isAllTasksStatusBe(status) {
        let tasks = [];
        for (let index = 0; index < await todoList.getCount(); index++) {
            tasks[index] = await (await todoList.getElement(index)).getAttribute(tasksStatusAttribute);
            if(await (await todoList.getElement(index)).getAttribute(tasksStatusAttribute) != status) {
                return false;
            }
        }
        return true;
    }

    async waitUntilToggleAllButtonToBeNotDisplayed() {
        await toggleAllButton.waitUntilVisible({ reverse: true});
    }

    async isTaskListExist() {
        return await todoList.isExisting();
    }

    async clickNewTodoTextField() {
        await newTodoTextField.click();
    }

    async getListOfTasks() {
        let tasks = [];
        for (let index = 0; index < await todoList.getCount(); index++) {
            tasks[index] = await (await todoList.getElement(index)).getText();
        }
        return tasks;
    }

    async clickTodosLabel() {
        await todosHeaderLabel.click();
    }

    async isElementPresent(textOfElement) {
        for (let index = 0; index < await todoList.getCount(); index++) {
            if(textOfElement == await (await todoList.getElement(index)).getText()){
                return true;
            }
        }
        return false;
    }

    async waitUntilTodoListToBeDisplayed() {
        await todoList.waitUntilVisible();
    }

    async waitUntilNewTodoFieldToBeDisplayed() {
        await newTodoTextField.waitUntilVisible();
    }

    async setNewTodoText(text) {
        await newTodoTextField.setValue(text);
    }

    async pressEnterInInputBox(){
        await newTodoTextField.sendKey(enterKey);
    }
}