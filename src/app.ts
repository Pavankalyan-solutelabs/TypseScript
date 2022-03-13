function autobind(
    _:any,
    _2:string,
    descriptor:PropertyDescriptor
    ){
    const originalMethod=descriptor.value;
    const adjDescriptor:PropertyDescriptor={
        configurable:true,
        get(){
            const boundFn=originalMethod.bind(this);
            return boundFn;
        }
       
    }
    return adjDescriptor
}
    


class ProjectInput{
    templateElement:HTMLTemplateElement;
    hostElement:HTMLDivElement;
    element:HTMLFormElement;
    titleInputElemet:HTMLInputElement;
    descriptionInputElemet:HTMLInputElement;
    peopleInputElemet:HTMLInputElement;
    constructor(){
        this.templateElement=document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement=<HTMLDivElement>document.getElementById("app")!;
        
        const importeNode=document.importNode(this.templateElement.content,true);
        this.element=importeNode.firstElementChild as HTMLFormElement;
        this.element.id='user-input';
        this.titleInputElemet=this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElemet=this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElemet=this.element.querySelector('#people') as HTMLInputElement;




        this.configure();
        this.attach();
    }
    @autobind
    private submitHandler(event:Event){
        event.preventDefault()
        console.log(this.titleInputElemet.value)
    }

    private configure(){
        // this.element.addEventListener("submit",this.submitHandler.bind(this)) // One Way
        this.element.addEventListener("submit",this.submitHandler);               // 2nd way by decorators
    }

    private attach(){
        this.hostElement.insertAdjacentElement('afterbegin',this.element);
    }
}

const prjInput=new ProjectInput