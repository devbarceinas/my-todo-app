import { LitElement, html, css } from 'https://unpkg.com/lit-element?module';

class TodoList extends LitElement {
  static get properties() {
    return {
      todos: { type: Array }
    };
  }

  static get styles() {
    return css`
      button {
        border-radius: 10px;
        border: none;
        color: #fafafa;
        background: #E31566;
        cursor: pointer;
      }
    `;
  }

  render() {
    if (!this.todos) {
      return html``;
    }

    return html`
      <ol>
        ${this.todos.map(
          todo => html`
            <li>
              <input
                type="checkbox"
                .checked=${todo.finished}
                @change=${e => this._changeTodoFinished(e, todo)}
              />
              ${todo.text}
              <button @click="${() => this._removeTodo(todo)}">X</button>
            </li>
          `,
        )}
      </ol>
    `;
  }

  _changeTodoFinished(e, changedTodo) {
    const eventDetail = {
      changedTodo,
      finished: e.target.checked
    };
    this.dispatchEvent(new CustomEvent('change-todo-finished', {
      detail: eventDetail
    }));
  }

  _removeTodo(item) {
    this.dispatchEvent(new CustomEvent('remove-todo', {
      detail: item
    }));
  }
}

customElements.define('todo-list', TodoList);