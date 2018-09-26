export type TMessage = {
    name: String,
    text: String
}

export interface IState {
    list: Array<TMessage>;
}