// ---------- PROFILE.JS ---------- //


startProfile();

async function startProfile() {
    user = await new User();
    await user.init();

    userElement = await new UserElement(user);
    userElement.renderProfile();
    


}


