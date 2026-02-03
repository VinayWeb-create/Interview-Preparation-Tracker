const topicInput = document.getElementById("topicInput");
const addBtn = document.getElementById("addBtn");
const topicList = document.getElementById("topicList");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

let topics = JSON.parse(localStorage.getItem("topics")) || [];

renderTopics();

addBtn.addEventListener("click", addTopic);

function addTopic() {
  const text = topicInput.value.trim();
  if (text === "") return;

  const topic = {
    id: Date.now(),
    name: text,
    done: false
  };

  topics.push(topic);
  saveAndRender();
  topicInput.value = "";
}

function toggleStatus(id) {
  topics = topics.map(topic =>
    topic.id === id ? { ...topic, done: !topic.done } : topic
  );
  saveAndRender();
}

function renderTopics() {
  topicList.innerHTML = "";

  topics.forEach(topic => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${topic.name}</span>
      <button onclick="toggleStatus(${topic.id})">
        ${topic.done ? "Done" : "Pending"}
      </button>
    `;

    topicList.appendChild(li);
  });

  updateProgress();
}

function updateProgress() {
  const completed = topics.filter(t => t.done).length;
  const percent = topics.length
    ? Math.round((completed / topics.length) * 100)
    : 0;

  progressBar.style.width = percent + "%";
  progressText.innerText = percent + "% Completed";
}

function saveAndRender() {
  localStorage.setItem("topics", JSON.stringify(topics));
  renderTopics();
}
