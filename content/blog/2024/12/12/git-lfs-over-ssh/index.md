---
title: "How to use Git LFS over SSH without requiring HTTP"
start_date: "2024-12-12T04:47:00Z"
date: "2024-12-12T04:47:00Z"
tags: ["git", "lfs", "ssh"]
draft: false
comment_issue_id: 65
---

Git is an essential tool for developers, enabling collaborative version control for projects large and small. When working with large files—think high-resolution images, videos, or massive datasets—Git LFS (Large File Storage) is a lifesaver. However, the default Git LFS implementation uses HTTP for communication, which might not always fit your setup or preferences. I recently faced this issue while trying to set up Git with LFS on my own server. I wanted everything to work over SSH, avoiding the need to configure LFS over HTTP. That’s when I discovered `git-lfs-transfer`: a command-line interface tool that lets you use Git LFS over SSH, eliminating the need for HTTP.

This article will walk you through setting up and using `git-lfs-transfer` for a seamless Git LFS experience over SSH.

#### Prerequisites

Before diving in, make sure you have the following:

1. **Git installed**: If not, you can find instructions and downloads on [git-scm.com](https://git-scm.com/).
2. **Rust installed**: The CLI tool we’ll be using is written in Rust, so you’ll need to have Rust installed on your system. If you don’t have it yet, visit [rust-lang.org/tools/install](https://www.rust-lang.org/tools/install) for instructions.

#### Installing `git-lfs-transfer`

The `git-lfs-transfer` tool is hosted on GitHub under the repository `bk2204/scutiger`. It’s easy to install using Rust’s package manager, Cargo. Here’s how:

1. Open your terminal or command prompt.
2. Run the following command:

   ```bash
   cargo install --git https://github.com/bk2204/scutiger.git scutiger-lfs
   ```

   This command fetches the `scutiger-lfs` project and installs the `git-lfs-transfer` tool on your system.

3. Verify the installation by typing:

   ```bash
   git-lfs-transfer --version
   ```

   If the tool is correctly installed, this command will display its version.

To use `git-lfs-transfer`, you need to set it up on both the client (your machine) and the server (where your Git repository is hosted).

**Server Setup**

1. **Install `git-lfs-transfer`**: Follow the same installation steps as on the client. Ensure Rust and Cargo are available, and do the steps above.

2. **Configure the server’s PATH**:

   - Ensure that the `git-lfs-transfer` binary is in the `PATH` of the SSH user that executes the Git commands. Keep in mind that the environment used for direct command execution over SSH might differ from an interactive shell. For example, if you’re using `bash`, ensure that the `PATH` is set in a file like `.bashrc` or `.profile` instead of `.bash_profile`, as the latter is only used for interactive shells. To verify, use a direct SSH command like:

     ```bash
     ssh git-user@my-git-server.com which git-lfs-transfer
     ```

     This command should return the path to the `git-lfs-transfer` binary. If it doesn’t, adjust your environment variables or move the binary to a directory in the `PATH`.

3. **Verify the setup**:
   - Create a test repository on your client with Git LFS enabled. Add a large file to the repository using LFS, commit it, and push it to the server. If the server is correctly configured, the large file will transfer seamlessly using Git LFS.

#### Possible Issues and Troubleshooting

1. **Error: Command Not Found**

   - Ensure `git-lfs-transfer` is installed and in your `PATH` on both the client and server. Note that binaries installed with `cargo install` are local to the user who runs the command by default. Therefore, you must either run the installation with the same user under which the Git repository operates or manually copy the binary from the user’s local bin directory to a system-wide bin directory (e.g., `/usr/local/bin`).

1. **Permission Denied**

   - Check the permissions of the SSH user on the server. Ensure the user has access to the Git repository and the `git-lfs-transfer` binary.

1. **Large File Transfers Not Working**

   - Verify that Git LFS is initialized in your repository. Run:

     ```bash
     git lfs install
     git lfs track "*.filetype"
     git add .gitattributes
     git commit -m "Track large files with Git LFS"
     ```

   - Ensure the `.gitattributes` file is pushed to the remote repository.

#### Wrapping Up

The `git-lfs-transfer` tool is a powerful way to enhance your Git LFS setup by enabling SSH-based transfers. By following this guide, you can move away from HTTP dependencies and simplify your workflow while maintaining robust handling of large files. Whether you’re hosting your own Git server or working with a team, this tool is a great addition to your version control toolkit.

Happy coding!
