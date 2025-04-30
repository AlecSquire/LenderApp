<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Postmark\PostmarkClient;

class PostmarkTestMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $clientToken;
    protected $emailTag;
    protected $trackOpens;
    protected $trackLinks;
    protected $messageStream;
    protected $emailSubject;
    protected $htmlContent;
    protected $textContent;

    /**
     * Create a new message instance.
     */
    public function __construct(
        string $clientToken = '83733341-5e62-4fb0-a423-25be88d59d78',
        string $emailTag = 'example-email-tag',
        bool $trackOpens = true,
        string $trackLinks = 'None',
        string $messageStream = 'outbound'
    ) {
        $this->clientToken = $clientToken;
        $this->emailTag = $emailTag;
        $this->trackOpens = $trackOpens;
        $this->trackLinks = $trackLinks;
        $this->messageStream = $messageStream;
        $this->emailSubject = 'Hello from Postmark';
        $this->htmlContent = "<strong>Hello</strong> dear Postmark user.";
        $this->textContent = "Hello dear Postmark user.";
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->from('lender@alecsquire.co.uk')
            ->subject($this->emailSubject)
            ->view('emails.postmark-test');
    }

    /**
     * Send the message using the given mailer.
     * This overrides the default send method to use Postmark client directly.
     *
     * @param  \Illuminate\Contracts\Mail\Factory|\Illuminate\Contracts\Mail\Mailer  $mailer
     * @return void
     */
    public function send($mailer)
    {
        // Before sending, make sure we have a 'to' address
        if (empty($this->to)) {
            throw new \Exception('No recipient specified. Use ->to() method before sending.');
        }

        // Create the Postmark client
        $client = new PostmarkClient($this->clientToken);

        // Get the "to" email address
        $to = $this->to[0]['address'];

        // Send the email directly via Postmark
        $sendResult = $client->sendEmail(
            'lender@alecsquire.co.uk',  // from email
            $to,                        // to email
            $this->emailSubject,        // using our explicitly defined subject
            $this->htmlContent,         // HTML body
            $this->textContent,         // Text body
            $this->emailTag,            // tag
            $this->trackOpens,          // track opens
            NULL,                       // reply to
            NULL,                       // CC
            NULL,                       // BCC
            NULL,                       // header array
            NULL,                       // attachment array
            $this->trackLinks,          // track links
            NULL,                       // metadata array
            $this->messageStream        // message stream
        );

        return $sendResult;
    }
}
