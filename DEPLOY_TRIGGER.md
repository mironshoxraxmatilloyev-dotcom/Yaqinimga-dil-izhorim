# DEPLOYMENT TRIGGER
# Bu fayl o'zgartirilganda Render.com automatic deploy qiladi

DEPLOYMENT_TIME=$(date)
COMMIT_HASH=$(git rev-parse HEAD)

echo "Last deployment: $DEPLOYMENT_TIME"
echo "Commit: $COMMIT_HASH"

# Force deployment trigger
echo "Deployment #$(date +%s)" >> .deployment_log