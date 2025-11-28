# @vaerone/erroriq

ErrorIQ is a lightweight, framework-agnostic TypeScript library that provides structured errors, serialization utilities and a pluggable logging pipeline.

## Features

- Typed BaseAppError
- Extensible ErrorFactory
- Safe serializers for sending to UI / API
- Transport pipeline (addTransport) — plug in Sentry, Datadog, console, etc
- Zero built-in adapters (keep integrations external)

## Quick start

```bash
npm i @vaerone/erroriq
