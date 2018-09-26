export interface TMessage {
    name: string;
    text: string;
}

export interface IState {
    inputText: string;
    list: TMessage[];
}
