# dsh-theme-monokai

An **unofficial Monokai-inspired** dark theme for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (dsh) Web UI, with a yellow accent variant and matching Shiki syntax colors.

## Features

- Monokai-inspired dark palette for the dsh Web UI
- Yellow accent variant
- Integrated into **Settings → General → Appearance** as a fourth option: `Monokai`
- Matching Shiki syntax colors for code blocks
- Reverts cleanly to dsh's built-in Light / Dark / System

![1.png](.\assets\1.png)

![2.png](.\assets\2.png)

## Install

```bash
git clone https://github.com/SocialPandaX/dsh-theme-monokai.git ~/dsh-theme-monokai
dsh plugin --profile web add -w ~/dsh-theme-monokai
```

Then restart the web profile:

```bash
dsh web
```

Open **Settings → General → Appearance** and choose **Monokai**.

## Uninstall

```bash
dsh plugin --profile web remove dsh-theme-monokai
rm -rf ~/dsh-theme-monokai
```

Restart `dsh web`.

## License

MIT
