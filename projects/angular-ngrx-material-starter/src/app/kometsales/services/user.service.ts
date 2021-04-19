import { v4 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { Model, ModelFactory } from '@angular-extensions/model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const INITIAL_DATA: Userdb[] = [
  { id: uuid(), email: 'rockets', name: 'Elon', prioridad: 'Musk' },
  { id: uuid(), email: 'investing', name: 'Nassim', prioridad: 'Taleb' },
  { id: uuid(), email: 'philosophy', name: 'Yuval', prioridad: 'Harari' }
];

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users$: Observable<Userdb[]>;

  private baseUrl = "http://localhost:8080/api/v1/";

  private model: Model<Userdb[]>;

  constructor(private httpClient: HttpClient,private modelFactory: ModelFactory<Userdb[]>) {
    //this.model = this.modelFactory.create([...INITIAL_DATA]);    
    //this.users$ = this.model.data$;
  }

  getUsersList(): Observable<Userdb[]>{
    
    return this.httpClient.get<Userdb[]>(this.baseUrl+"user");

  }

  addUser(user: Partial<Userdb>) {
    const users = this.model.get();

    users.push({ ...user, id: uuid() } as Userdb);

    this.model.set(users);
  }

  updateUser(user: Userdb) {
    const users = this.model.get();

    const indexToUpdate = users.findIndex((u) => u.id === user.id);
    users[indexToUpdate] = user;

    this.model.set(users);
  }

  removeUser(id: string) {
    const users = this.model.get();

    const indexToRemove = users.findIndex((user) => user.id === id);
    users.splice(indexToRemove, 1);

    this.model.set(users);
  }
}

export interface Userdb {
  id: string;
  email: string;
  name: string;
  prioridad: string;
}
