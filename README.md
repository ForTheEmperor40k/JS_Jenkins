# Webdriverio Tips Tricks #

# 1. Adding todos

## 1.1 Add new task 
Pre-conditions: Task list must be empty.
1. Enter a random text into the [New todos] text field;
2. Press the Enter button on the keyboard;
3. Verify the correct field has been added.

## 1.2 Add new task by click
Pre-conditions: Task list must be empty.
1. Enter a random text into the [New todos] text field;
2. Click on the space outside the text box;
3. Verify the correct field has been added.

## 1.3 Correct order of tasks
Pre-conditions: Task list must be empty.
1. Add three tasks;
2. Verify that the records are displayed according to the cases entered;

## 1.4 Empty line is not added
Pre-conditions: Task list must be empty.
1. Click [New todos] text field.
2. Press the Enter button on the keyboard;
3. Verify the empty string is not added to the list.

## 1.5 New tasks can contain at least 300 characters
Pre-conditions: Task list must be empty.
1. Enter a string of 300 characters;
2. Press the Enter button on the keyboard;
3. Make sure the entered string is displayed correctly;


# 2. [Toggle all] button

## 2.1 The button is not displayed if there are no records
Pre-conditions: Task list must be empty.
1. Verify there are no tasks;
2. Verify the [Toggle all] button not displayed;

## 2.2 The button switches the status of tasks to completed
Pre-conditions: Add 3 tasks.
1. Verify that tasks status is not completed;
2. Click [Toggle all] button;
3. Verify all tasks are completed.

## 2.3 The button changes the status to completed even if there are completed tasks 
Pre-conditions: Add 3 tasks. On one of the tasks, switch the status to completed.
1. Verify that there is at least one completed task;
2. Click [Toggle all] button;
3. Verify all tasks are completed.


# 3. [Toggle task] button

## 3.1 Switch task as completed
Pre-conditions: Task list must be empty.
1. Add new task;
2. Vefify the task status is not completed;
3. Click the [Toggle task] button;
4. Vefify the task status is completed;

## 3.2 The toggle button should put it in an incomplete state
Pre-conditions: Task list must be empty.
1. Add new task;
2. Switch the task to the completed state;
3. Vefify the task status is completed;
4. Click the [Toggle task] button;
5. Vefify the task status is not completed;


# 4. [Remove task] button

## 4.1 The button should delete the task
Pre-conditions: Task list must be empty.
1. Add new task;
2. Verify the task is added;
3. Delete the task;
4. Verify the task is not exist;


# 5. [Counter] lable

## 5.1 No tasks no label
Pre-conditions: Task list must be empty.
1. Verify the task list is empty;
2. Verify the [Counter] item label is not displayed;

## 5.2 The number of outstanding tasks is displayed correctly
Pre-conditions: Task list must be empty.
1. Add 3 tasks;
2. Verify the counter displays the correct number of tasks;
3. Switch the status of one of the tasks to completed;
4. Verify the counter has decreased by one;
5. Delete one unfinished task;
6. Verify the counter has decreased by one;


# 6. [Clear completed] button

## 6.1 No completed tasks, the button not showing
Pre-conditions: Task list must be empty.
1. Add 3 tasks;
2. Verify the tasks have a status of uncomplete;
3. Verify the [Clear completed] button is not displayed.

## 6.2 The button should clean completed tasks
Pre-conditions: Task list must be empty.
1. Add 3 tasks;
2. On all tasks except one, switch the status to completed;
3. Click the [Clear completed] button;
4. Verify completed tasks are not displayed;
5. Verify the [Clear completed] button is not displayed.


# 7. [All] view button

## 7.1 The button displays all records
Pre-conditions: Task list must be empty.
1. Add 3 tasks;
2. On one any task, switch the status to completed;
3. Verify that the [All] view is selected;
4. Verify all records are displayed;


# 8. [Active] view button

## 8.1 View only displays active tasks -
Pre-conditions: Task list must be empty.
1. Add 3 tasks;
2. On one any task, switch the status to completed;
3. Click the [Active] view button;
4. Verify that tasks with status not completed are displayed;


# 9. [Completed] view button

## 9.1 View only displays completed tasks
Pre-conditions: Task list must be empty.
1. Add 3 tasks;
2. On one any task, switch the status to completed;
3. Click the [Completed] view button;
4. Verify that tasks with status completed are displayed;