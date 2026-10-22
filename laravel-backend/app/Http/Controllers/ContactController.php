<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'userName' => ['nullable', 'string', 'max:120'],
            'name' => ['nullable', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:180'],
            'subject' => ['required', 'string', 'max:160'],
            'message' => ['nullable', 'string', 'max:5000'],
        ]);

        $validated['name'] = $validated['name'] ?? $validated['userName'] ?? 'Website visitor';
        $validated['message'] = $validated['message'] ?? '';

        Mail::to(config('contact.to_email'))->send(new ContactFormMail($validated));

        return response()->json([
            'message' => 'Message sent successfully!',
        ]);
    }
}
