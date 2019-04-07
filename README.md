# AnydoHabitica

A command line integration tool from Any.do to Habitica

## Getting Started

1. Clone this project

1. Create a file in the top level of the project called `.env`

1. Edit the file with the appropriate values filled in: 

```
HABITICA_USER_ID=<<your Habitica user id>>
HABITICA_API_TOKEN=<<your Habitica api topken>>

ANYDO_EMAIL=<<the email used by your Any.do account>>
ANYDO_PASSWORD=<<your Any.do password>>
```

1. Enter the directory in your terminal, and run: 

```bash
npm start
```
If the `npm` command is not found, you may have to [install Node.js](https://nodejs.org/en/download/package-manager/).

The scrip will be executed once, updating your Habitica account. If you want the script to run periodically, consider making a [cron job](https://en.wikipedia.org/wiki/Cron).

## Usage

I am building the project primarily to learn, and it is a work in progress, but there are some helpful features for users of Any.do and Habitica.

Currently, the project can create To-Dos and Dailies in Habitica from Tasks in Any.do. 

If a Task is a One time Task in Any.do, it will be ported to Habitica as a To-Do. The scheduled date of the Task will become the To-do's due date in Habitica.

If a Task is a Repeat Task in Any.do, it will be ported to Habitica as a Daily. Repeat Tasks with a Daily, Weekly, Monthly or Yearly repeat schedules will have the same schedules on Habitica. I have not yet ported the more complex schedule logic. 

If an Any.do Task has notes, the notes will be ported to Habitica. Any.do only allows (for nonpaying clients, anyway) two levels of priority, Normal and High. Normal priority tasks become Easy Tasks in Habitica, and Priority tasks become Hard tasks in Habitica. 

If you complete a Task in Any.do and then run this script, the corresponding task in Habitica will be completed and scored. If you later set the task to Incomplete in Any.do and run the script, the task will be set to incomplete in Habitica and the xp removed. 

Likewise, any edits to Any.do Tasks will be ported to Habitica after the script is run. 

## Roadmap

There's no real roadmap for this project, as I'm working on it on my free time as one of many learning exercises, more or less when I feel like it. However, I do have some ideas for features I'd like to implement: 

- The Any.do list a Task is assigned to becomes a tag in Habitica

- More complex scheduling logic for Repeat Tasks is ported to Habitica

- Two-way sync: tasks from Habitica are ported to Any.do

Please feel free to suggest more ideas in the project Issues. 
