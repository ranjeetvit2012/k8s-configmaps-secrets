# k8s-configmaps-secrets
Kubernetes configurations for deploying a simple backend built with Bun, using Minikube for local development. This setup demonstrates how to use ConfigMaps and Secrets to manage environment variables and sensitive data securely. Perfect for learning and testing Kubernetes deployment patterns with modern JavaScript runtimes.


# 🚀 Bun Backend on Kubernetes (Minikube)

This project contains Kubernetes configurations to deploy a simple backend application built using [Bun](https://bun.sh), running inside a Minikube cluster. It demonstrates the use of **ConfigMaps** and **Secrets** to manage environment variables securely.

---

## 📦 Project Structure

```
/
├── Dockerfile
├── index.ts
├── .env (mounted via Kubernetes Secret)
├── ops/
│   └── development.yml (Kubernetes config)
├── package.json
├── tsconfig.json
└── ...
```

---

## ⚙️ Prerequisites

- [Minikube](https://minikube.sigs.k8s.io/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Bun](https://bun.sh/) (for local dev, optional)
- Docker installed

---

## 🛠️ Deployment Steps

### 1. Start Minikube
```bash
minikube start
```

### 2. Apply Kubernetes Configuration
```bash
kubectl apply -f ops/development.yml
```

### 3. Restart the Deployment (if needed)
```bash
kubectl rollout restart deployment ecom-backend-deployment
```

### 4. Verify the Pod is Running
```bash
kubectl get pods
```

---

## 🔒 Secrets & Env Variables

Secrets are mounted into the container at `/app/secret/.env`.

To inspect:
```bash
kubectl exec -it <pod-name> -- /bin/sh
ls -l /app/secret
cat /app/secret/.env
```

---

## 🌐 Expose the Service

### Option 1: Expose via NodePort
```bash
kubectl expose deployment ecom-backend-deployment --type=NodePort --port=3000 --target-port=3000
```

Then get the service and NodePort:
```bash
kubectl get svc
kubectl get nodes -o wide
```

Access the app at:
```
http://<Node-IP>:<NodePort>
```

---

### ✅ Option 2: Use `minikube service` (Recommended)
```bash
minikube service ecom-backend-deployment
```

This will automatically open the app in your default browser with the correct URL.

> ⚠️ Keep the terminal open! The tunnel will close if you exit.

---

## 🐛 Common Issues

- **Permission Denied on `/app/secret`**: This is expected if you're trying to execute it. Use `cat /app/secret/.env` to view contents.
- **Browser Doesn’t Load on 192.168.x.x**: This is a common WSL2 networking issue. Use `minikube service` instead.

---

## 📄 License

MIT
