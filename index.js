const Dotenv = require("dotenv").config();
const Habitica = {
  ...require("./Habitica/Client"),
  ...require("./Habitica/Task"),
};
const AnyDo = { ...require("./AnyDo/Client") };
const { at } = require("lodash");
const Todos = require("./Habitica/Todos");
Promise.Util = require("./Promise/Util");

const habiticaUserId = process.env.HABITICA_USER_ID;
const habiticaApiToken = process.env.HABITICA_API_TOKEN;
const anyDoEmail = process.env.ANYDO_EMAIL;
const anyDoPassword = process.env.ANYDO_PASSWORD;

const anyDoIgnoreListIds = process.env.ANYDO_IGNORE_LIST_IDS.split(",");

const habitica = new Habitica.Client(habiticaApiToken, habiticaUserId);

const anyDo = new AnyDo.Client(anyDoEmail, anyDoPassword, {ignoreListIds : anyDoIgnoreListIds});

const addMissingAnyDoTasks = (anyDoTasks, habiticaTasks) => {
  // For now we can use lists
  // O(nm), fix if it becomes a problem

  anyDoTasks.forEach((aTask) => {
    if (!habiticaTasks.find((hTask) => aTask.equalsHabiticaTodo(hTask))) {
      habitica.newTodo(aTask.toHabiticaTodo());
    }
  });
};

const anyDoToHabiticaScore = (anyDoTasks, habiticaTasks) => {
  anyDoTasks.forEach((aTask) => {
    const hTask = habiticaTasks.find((hTask) =>
      aTask.equalsHabiticaTodo(hTask)
    );
    if (!hTask) return;

    if (aTask.isCompleted() == hTask.isCompleted()) return;

    if (aTask.isCompleted()) {
      habitica.complete(hTask);
    } else {
      habitica.incomplete(hTask);
    }

  });
};

anyDoToUpdateHabiticaMetadata = (anyDoTasks, habiticaTasks) => {
  anyDoTasks.forEach((aTask) => {
    const hTask = habiticaTasks.find((hTask) =>
      aTask.equalsHabiticaTodo(hTask)
    );
    if (!hTask) return;

    const source = aTask.toHabiticaTodo();

    if (source.otherNeedsUpdate(hTask)) {
      habitica.update(source);
    }
      
});
};

anyDo.tasks()
  .then(async (anyDoTasks) => {
    var habiticaTasks = await habitica.todos()
    addMissingAnyDoTasks(anyDoTasks, habiticaTasks);
    habiticaTasks = await habitica.todos()
    anyDoToHabiticaScore(anyDoTasks, habiticaTasks);
    habiticaTasks = await habitica.todos()
    anyDoToUpdateHabiticaMetadata(anyDoTasks, habiticaTasks);
  })
  .catch((rejected) => console.log(rejected));

