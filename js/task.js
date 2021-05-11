import {url,containerTasks} from './script.js';
import {XHR} from './xhr.js';
import {Form} from './form.js';

export class Task{
	constructor(task){
		this.create(task);
		this.render();
	}

	create(task){
		for(let key in task){
			this[key] = task[key];
		}
	}

	render(){
		let tr = document.createElement(`tr`),
			tdBtn = document.createElement(`td`),
			editBtn = document.createElement(`button`),
			saveBtn = document.createElement(`button`),
			deleteBtn = document.createElement(`button`);

		tr.dataset.id = this.id;

		editBtn.innerHTML = `Edit`;
		editBtn.className = `btn btn-primary btn-edit me-2`;
		editBtn.addEventListener(`click`,this.edit.bind(this));

		saveBtn.innerHTML = `Save`;
		saveBtn.className = `btn btn-secondary btn-save me-2`;
		saveBtn.disabled = true;
		saveBtn.addEventListener('click',this.save.bind(this));

		deleteBtn.innerHTML = `Delete`;
		deleteBtn.className = `btn btn-danger`;
		deleteBtn.addEventListener(`click`,this.delete.bind(this));

		tr.innerHTML = `<td>
							<input type="text" class="form-control" value="${this.name}" disabled>
						</td>`;

		tdBtn.append(editBtn,saveBtn,deleteBtn);
		tr.append(tdBtn);

		containerTasks.append(tr);
	}

	delete(){
		XHR.xhr(`${url}/${this.id}`,`DELETE`)
			.then(
				() => Form.get()
			)
	}

	edit(){
		let tr = document.querySelector(`tr[data-id="${this.id}"]`),
			input = tr.querySelector(`input`),
			editBtn = tr.querySelector(`button.btn-edit`),
			saveBtn = tr.querySelector(`button.btn-save`);

		input.disabled = false;
		input.focus();

		saveBtn.classList.add(`btn-success`);
		saveBtn.disabled = false;
	}

	save(){
		let tr = document.querySelector(`tr[data-id="${this.id}"]`),
			input = tr.querySelector(`input`);

		let task = {
			id: tr.dataset.id,
			createdAt: new Date(),
			name: input.value
		}

		XHR.xhr(`${url}/${this.id}`,`PUT`,task)
			.then(
				() => Form.get()
			)
	}
}