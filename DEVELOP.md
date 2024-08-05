



# 开发指南

## wsl 安装

### 先决条件

必须运行 Windows 10 版本 2004 及更高版本（内部版本 19041 及更高版本）或 Windows 11。

### 安装

现在，可以在管理员 PowerShell 或 Windows 命令提示符中输入此命令，然后重启计算机来安装运行适用于 Linux 的 Windows 子系统 (WSL) 所需的全部内容。

```powershell
wsl --install
```

--install 命令执行以下操作：

- 启用可选的 WSL 和虚拟机平台组件
- 下载并安装最新 Linux 内核
- 将 WSL 2 设置为默认值
- 下载并安装 Ubuntu Linux 发行版（可能需要重新启动）
- 若未正常安装 Ubuntu，请打开 Microsoft Store 应用，搜索 “Ubuntu”，然后单击“获取”按钮


首次启动新安装的 Linux 发行版时，将打开一个控制台窗口，要求你等待将文件解压缩并存储到计算机上。 未来的所有启动时间应不到一秒。

### 设置 Linux 用户名和密码

使用 WSL 安装 Linux 发行版的过程完成后，使用“开始”菜单打开该发行版（默认情况下为 Ubuntu）。 系统将要求你为 Linux 发行版创建“用户名”和“密码”。


- 此用户名和密码特定于安装的每个单独的 Linux 分发版，与 Windows 用户名无关。

- 创建用户名和密码后，该帐户将是分发版的默认用户，并将在启动时自动登录。

- 此帐户将被视为 Linux 管理员，能够运行 sudo (Super User Do) 管理命令。

- 在 WSL 上运行的每个 Linux 发行版都有其自己的 Linux 用户帐户和密码。 每当添加分发版、重新安装或重置时，都必须配置一个 Linux 用户帐户。


### 配置apt安装源为阿里源

- 备份sources.list文件
```bash
sudo cp /ect/apt/sources.list /etc/apt/sources.list.bak
```

- 修改sources.list文件
```bash
# 18.04
echo "# 阿里云的源 18.04
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
" > /etc/apt/sources.list

#20.04
echo "# 阿里云的源 20.04
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
" > /etc/apt/sources.list

#22.04
echo "# 阿里云的源 22.04
deb http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
" > /etc/apt/sources.list
```





### 更新和升级包

建议使用发行版的首选包管理器定期更新和升级包。 对于 Ubuntu 或 Debian，请使用以下命令：

```bash
sudo apt update && sudo apt upgrade
```

Windows 不会自动更新或升级 Linux 分发版。 大多数 Linux 用户往往倾向于自行控制此任务。


### 安装 Windows Terminal

使用 Microsoft Store 安装 Windows 终端

### 安装 nvm、node.js 和 npm


- 打开 Ubuntu 命令行

- 使用以下命令安装 nvm：curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

- 重新打开 Ubuntu 命令行
```bash
nvm install --lts
```
- 验证 Node.js 及 npm
```bash
node --version
npm --version
```
- 安装 yarn
```bash
npm install --global yarn
```

### 克隆仓库

```bash
git clone http://39.108.227.101:9080/Brainfuck/lm-fe-libs.git
```

### 安装依赖、初始化

```bash
cd lm-fe-libs
yarn && yarn boot
```
### 进入对应包目录开发，以 `packages/pages` 为例

```bash
cd packages/pages
yarn build:watch
```

### 开发调试

- 可以运行示例项目（较简单），另开一个 shell 窗口, 在根目录执行:
###
```bash
yarn start:basic
```
- 利用 `npm link` 以软连接方式导入目标项目（不推荐）
### 发布
- 先决条件：注册 npm 账号，并且 通过 `npm login` 登录
- npm 登录之后，在根目录执行：
```bash
yarn commit:release
yarn release
```
按照指引选择版本号即可。