export default interface IMail {
    body: string;
    date: string;
    email_lead: string;
    status: string;
    subject: string;
    repliedBy?: string;
}