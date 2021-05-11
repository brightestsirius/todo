import {url,containerTasks} from './script.js';
import {XHR} from './xhr.js';
import {Task} from './task.js';

export class Form{
	constructor(el){
		this.el = document.querySelector(el);

		this.el.addEventListener('submit', this.submit.bind(this));
	}

	async submit(e){
		e.preventDefault();
		let input = this.el.querySelector('input'),
			taskName = input.value;

		input.value = ``;
		this.add(taskName);
	}

	async add(taskName){
		let task = {
			createdAt: new Date(),
			name: taskName
		};

		let newTask = await XHR.xhr(url,`POST`,task),
			createTask = await new Task(newTask);
	}

	static get(){
		XHR.xhr(url)
			.then(
				tasks => {
					containerTasks.innerHTML = ``;
					return tasks;
				}
			)
			.then(
				tasks => tasks.forEach(task => new Task(task))
			)
	}
}