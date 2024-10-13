export class Article {
    constructor(...props) {
        this.title = props.title;
        this.content = props.content;
        this.writer = props.writer;
    }
}

export class User {
    constructor(...props) {
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
    }
}

export class Comment {
    constructor(...props) {
        this.content = props.content;
        this.writer = props.writer;
    }
}

export class Tag {

}

