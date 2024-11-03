export function greeting(){
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
    return "Good morning";
    } else if (currentTime < 17) {
    return "Good afternoon";
    } else {
    return "Good evening";
    }
}