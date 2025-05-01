# Kubernetes Debug & Access Guide for Developers

This guide helps any developer understand how to inspect, debug, and expose services running in Kubernetes using `kubectl` and related tools.

---

## 1. Check Services (Cluster IP / NodePort / LoadBalancer)

```bash
kubectl get svc
```

Sample output:
```
NAME           TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)           AGE
my-service     NodePort    10.96.123.45    <none>        3000:32000/TCP    5m
```

- **PORT(S)** → Internal (3000) and external (32000) ports.
- **EXTERNAL-IP** → Public IP if using LoadBalancer.

### View detailed info:
```bash
kubectl describe svc my-service
```

---

## 2. Check Pod IP (Internal to Cluster Only)

```bash
kubectl get pods -o wide
```
This shows each pod's internal IP, only accessible inside the cluster.

---

## 3. Port Forward to Access Locally

If your service is not exposed externally:

```bash
kubectl port-forward svc/my-service 8080:3000
```
Access at:
```
http://localhost:8080
```

---

## 4. Get Node External IP (For NodePort/LoadBalancer)

```bash
kubectl get nodes -o wide
```
Then access:
```
http://<node-external-ip>:<nodeport>
```

---

## 5. Working with Secrets

### Apply a Secret:
```bash
kubectl apply -f ops/secret.yml
```
Output:
```
secret/backend-secret configured
```

### View All Secrets:
```bash
kubectl get secrets
```

### View Secret (Base64 Encoded):
```bash
kubectl get secret backend-secret -o yaml
```

Example:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: backend-secret
type: Opaque
data:
  DB_USER: YWRtaW4=
  DB_PASS: c2VjcmV0
```

### Decode Values (Linux/macOS):
```bash
echo 'YWRtaW4=' | base64 --decode
```

---

## 6. Other Useful Commands

### Apply Deployment:
```bash
kubectl apply -f development.yml
```

### Restart Deployment:
```bash
kubectl rollout restart deployment <deployment-name>
```

### Exec Into a Pod:
```bash
kubectl exec -it <pod-name> -- /bin/sh
```

### Check Mounted Secret Files:
```bash
ls -l /app/secret
cat /app/secret/.env
```

Example output from `.env` file:
```
DATABASE_URL=postgres://...
AWS_SECRET=...
PORT=3000
PUBLIC_KEY=...
JWT_SECRET=...
```

---

## 7. Expose Node.js App via NodePort

```bash
kubectl expose deployment <your-deployment-name> --type=NodePort --port=3000 --target-port=3000
kubectl get svc
```
Then access:
```
http://<Node-IP>:<NodePort>
```
To get the Node IP:
```bash
kubectl get nodes -o wide
```

---

## 8. If Browser Doesn't Load in WSL2

WSL2 may not expose the Kubernetes IP (like `192.168.49.2`) correctly to your Windows browser.

### ✅ Option: Use `minikube service` (automatically opens browser)
```bash
minikube service ecom-backend-deployment
```

