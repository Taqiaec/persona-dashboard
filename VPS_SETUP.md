# VPS Setup — Persona 5 Dashboard

**Server:** `43.157.208.98`
**User:** `ubuntu`
**Pass:** `quantum-27@-nebula`
**Repo:** `https://github.com/Taqiaec/persona-dashboard.git`
**SSH Key:** `~/.ssh/vps-deploy` (already generated)

---

## 1. Push to GitHub

```bash
# in C:\Users\admin\dashboard
git remote add origin https://github.com/Taqiaec/persona-dashboard.git
git branch -M main
git push -u origin main
```

Make sure repo `persona-dashboard` exists on GitHub first.

---

## 2. SSH Into VPS (Password)

```bash
ssh ubuntu@43.157.208.98
```

---

## 3. Create Deploy User & Authorize Key

Run these on VPS:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Create deploy user
sudo adduser deploy
sudo usermod -aG sudo deploy

# Set up SSH key for deploy user
sudo mkdir -p /home/deploy/.ssh
echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAICJ0ZswI61C7qCMv2Aik5IWC5w4ZPHcT3oz+G3h2wJly admin@Cube" | sudo tee /home/deploy/.ssh/authorized_keys
sudo chown -R deploy:deploy /home/deploy/.ssh
sudo chmod 700 /home/deploy/.ssh
sudo chmod 600 /home/deploy/.ssh/authorized_keys
```

---

## 4. Test SSH Key (New Terminal)

Open **new terminal** (keep old one alive):

```bash
ssh deploy@43.157.208.98 -i ~/.ssh/vps-deploy
```

If it works, continue. If not, debug before closing first session.

---

## 5. Disable Password Auth & Firewall

Run these on VPS (still as ubuntu user):

```bash
sudo sed -i 's/^PermitRootLogin yes/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config
sudo sed -i 's/^PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart sshd

# Firewall — allow SSH, HTTP, HTTPS
sudo ufw allow 22/tcp && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp
sudo ufw --force enable
```

After this, password login disabled. Use key only.

---

## 6. Install Caddy + Node.js

SSH with key first:

```bash
ssh deploy@43.157.208.98 -i ~/.ssh/vps-deploy
```

Then:

```bash
# Caddy
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/deb.debian.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update && sudo apt install -y caddy

# Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt install -y nodejs

# Verify
caddy version
node -v
```

---

## 7. Clone & Build Dashboard

```bash
git clone https://github.com/Taqiaec/persona-dashboard.git /home/deploy/dashboard
cd /home/deploy/dashboard
npm install
npm run build
```

---

## 8. Caddy Config

```bash
sudo tee /etc/caddy/Caddyfile << 'EOF'
43.157.208.98 {
    root * /home/deploy/dashboard/dist
    file_server
    encode gzip zstd
    try_files {path} /index.html
}
EOF
```

Replace `dashboard.example.com` with your domain (point A record to `43.157.208.98`).

```bash
sudo systemctl reload caddy
```

No domain? Use HTTP-only config:

```bash
sudo tee /etc/caddy/Caddyfile << 'EOF'
:80 {
    root * /home/deploy/dashboard/dist
    file_server
    encode gzip zstd
    try_files {path} /index.html
}
EOF
sudo systemctl reload caddy
```

---

## 9. Verify

Browser → `http://43.157.208.98` or `https://dashboard.example.com`

Expect: Persona 5 styled dashboard with clock, diagonal lines BG, red-accent menu cards, hover effects.

---

## Customize Links

```bash
nano /home/deploy/dashboard/src/links.json
# edit, then rebuild:
cd /home/deploy/dashboard && npm run build
```

---

## Optional: Add System Monitor

```bash
sudo apt install -y prometheus-node-exporter
```

Add card in `links.json`:
```json
{
    "title": "System Monitor",
    "url": "http://43.157.208.98:9100",
    "icon": "activity",
    "category": "system"
}
```
