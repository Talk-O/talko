<h1 align="center">
	<picture>
		<source media="(prefers-color-scheme: dark)" srcset="docs/assets/branding/logo-white.svg">
		<img src="docs/assets/branding/logo-dark.svg" alt="TalkO" width="260">
	</picture>
</h1>

## Customer SDK Kit

This repository contains the private TalkO SDK integration kit delivered to customers who need server-side integrations with the managed TalkO cloud.

It is not a public open-source distribution and it is not intended for public package registries. The contents here are the authoritative reference implementations used to integrate with TalkO APIs, webhook deliveries, connectors, and authenticated backend workflows.

## What this kit includes

- Language reference clients for JavaScript/TypeScript, Python, and PHP.
- Webhook signature verification helpers aligned to the current TalkO backend.
- End-to-end examples for API keys, conversations, connectors, and webhook consumers.
- Resource maps, operational notes, and delivery guidance for customer engineering teams.

## Managed-service boundary

TalkO is consumed as a managed cloud platform. This kit helps customers integrate their applications with TalkO cloud endpoints. It does not describe or distribute a self-hosted TalkO product.

## Folder structure

- `docs/` — product-facing technical guidance for customer engineers.
- `packages/javascript/` — private TypeScript reference client and examples.
- `packages/python/` — private Python reference client and examples.
- `packages/php/` — private PHP reference client and examples.
- `examples/curl/` — raw HTTP examples for fast troubleshooting and onboarding.
- `schemas/` — payload schemas and machine-readable examples.

## Supported surfaces in this version

- Authentication with TalkO API keys or JWT bearer tokens.
- Conversations and conversation messages.
- Visitor context lookup through conversations.
- Webhook endpoint management and webhook signature verification.
- Connectors management.
- Workspace API keys.

## Distribution guidance

Deliver this kit through the customer GitHub share, a private archive, or another approved private channel. Do not reference public npm, PyPI, or Packagist packages unless a formal public release exists.

## Quick start

1. Provide the customer with a TalkO API key created from `Settings -> API Keys`.
2. Pick the language package that matches the customer's backend.
3. Start from the examples in that package.
4. Use the curl examples for debugging any authentication or payload mismatch.
