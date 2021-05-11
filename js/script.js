export const url = `https://6099728e99011f0017140ecc.mockapi.io/api/vi/tasks`,
			 containerTasks = document.querySelector(`#containerTasks tbody`);

import {XHR} from './xhr.js';
import {Form} from './form.js';
import {Task} from './task.js';

Form.get();

let createTask = new Form(`#createTask`);