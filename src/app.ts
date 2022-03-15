// Validation

interface Validatable {
  value: string | number;
  required?: boolean | undefined;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <=validatableInput.maxLength;
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value > validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value > validatableInput.max;
  }
  return isValid;
}

//Autobind Decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElemet: HTMLInputElement;
  descriptionInputElemet: HTMLInputElement;
  peopleInputElemet: HTMLInputElement;
  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = <HTMLDivElement>document.getElementById("app")!;

    const importeNode = document.importNode(this.templateElement.content, true);
    this.element = importeNode.firstElementChild as HTMLFormElement;
    //this.element=document.getElementById("user-input")! as HTMLFormElement;
    this.element.id = "user-input";
    this.titleInputElemet = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElemet = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElemet = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElemet.value;
    const enteredDescription = this.descriptionInputElemet.value;
    const enteredPeople = this.peopleInputElemet.value;

    const titleValidatable:Validatable={
        value:enteredTitle,
        required:true
    }

    const descriptionValidatable:Validatable={
        value:enteredDescription,
        required:true,
        minLength:5
    }

    const peopleValidatable:Validatable={
        value:+enteredPeople,
         required:true,
        min:0,
        max:10
    }

    if (
      // enteredTitle.trim().length===0 ||
      // enteredDescription.trim().length===0 ||
      // enteredPeople.trim().length===0
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("In valid Input, Please try again");
      return;
    //   this.clearInputs();
    //   return [enteredTitle, enteredDescription, +enteredPeople];
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }
  private clearInputs() {
    this.titleInputElemet.value = "";
    this.descriptionInputElemet.value = "";
    this.peopleInputElemet.value = "";
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    // console.log(this.titleInputElemet.value)
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
      this.clearInputs();
    }
    // const [title, desc, people] = userInput;
    // console.log(title, desc, people);

  }

  private configure() {
    // this.element.addEventListener("submit",this.submitHandler.bind(this)) // One Way
    this.element.addEventListener("submit", this.submitHandler); // 2nd way by decorators
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
