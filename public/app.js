document.addEventListener("click", (event) => {
  const buttonType = event.target.dataset.type;
  const datasetId = event.target.dataset.id;
  if (!datasetId || !buttonType) return;

  const id = datasetId.split("-")[1];

  const remove = async (id) => {
    await fetch(`/${id}`, { method: "DELETE" });
  };

  const edit = async (id) => {
    const newTitle = prompt("Новое название", "текст...").trim();
    if (!newTitle) {
      return;
    }

    await fetch(`/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    });
    return newTitle;
  };

  switch (buttonType) {
    case "remove":
      remove(id).then(() => {
        event.target.closest("li").remove();
      });
      break;

    case "edit":
      edit(id).then((newTitle) => {
        const titleSpan = document.querySelector(`#sp-${id}`);
        titleSpan.textContent = newTitle;
      });
      break;

    default:
      break;
  }
});
