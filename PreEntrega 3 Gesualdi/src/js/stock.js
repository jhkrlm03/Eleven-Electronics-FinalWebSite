import * as className from "./class.js";

const errorMsg = () => {
  Swal.fire({
    title: "Unexpected error has happen",
    icon: "warning",
    text: "We are having some issues with the products loaded, please try to connect later",
    confirmButtonText: "OK",
  }).then(() => {
    Swal.fire({
      title: "¿Do you want to refresh?",
      icon: "question",
      text: "To try to solve the problem you need to refresh the site",
      showCancelButton: true,
      confirmButtonText: "It's OK",
      cancelButtonText: "Stay Here",
    }).then(selection => {
        if(selection.isConfirmed)
        window.location.reload();
      })
  });
};

const stockLoader = async () => {
  try {
    const data = await fetch("./stock.json");
    if (data.ok) {
      return await data.json();
    }
  } catch (error) {
    console.log(error);
    errorMsg();
  }
};

let stock = await stockLoader();

stock = stock.map((el) => {
  switch (el.category) {
    case "Graphic Cards":
      return new className.GraphicCard(el);
    case "Processors":
      return new className.Processor(el);
    case "RAM Memories":
      return new className.RapidAccessMemory(el);
    case "Desktop Cases":
      return new className.ComputerCases(el);
  }
});

export { stock };
