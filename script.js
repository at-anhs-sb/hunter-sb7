document.addEventListener("DOMContentLoaded", () => {

    /* elements */

    const sidebar =
        document.getElementById("hunterSidebar");

    const doorTrigger =
        document.getElementById("doorTrigger");

    const doorExit =
        document.getElementById("doorExit");

    const scanLine =
        document.getElementById("scanLine");

    const copyButton =
        document.getElementById("copyBtn");


    /* sliding door */

    function openDoor() {

        if (!sidebar) {
            console.warn(
                "Hunter Team: #hunterSidebar was not found."
            );
            return;
        }

        sidebar.classList.add("door-open");

        if (doorTrigger) {
            doorTrigger.setAttribute(
                "aria-expanded",
                "true"
            );

            doorTrigger.textContent =
                "CLOSE ENTRANCE";
        }

        triggerScan();
    }


    function closeDoor() {

        if (!sidebar) {
            return;
        }

        sidebar.classList.remove("door-open");

        if (doorTrigger) {
            doorTrigger.setAttribute(
                "aria-expanded",
                "false"
            );

            doorTrigger.textContent =
                "OPEN ENTRANCE";
        }

        triggerScan();
    }


    function toggleDoor() {

        if (!sidebar) {
            console.warn(
                "Hunter Team: #hunterSidebar was not found."
            );
            return;
        }

        if (
            sidebar.classList.contains("door-open")
        ) {
            closeDoor();
        } else {
            openDoor();
        }
    }


    /* =====================================================
       OPEN BUTTON
       ===================================================== */

    if (doorTrigger) {

        doorTrigger.addEventListener(
            "click",
            toggleDoor
        );

    }


    /* =====================================================
       EXIT BUTTON
       ===================================================== */

    if (doorExit) {

        doorExit.addEventListener(
            "click",
            closeDoor
        );

    }


    /* =====================================================
       SCAN EFFECT
       ===================================================== */

    function triggerScan() {

        if (!scanLine) {
            return;
        }

        scanLine.classList.remove("active");

        void scanLine.offsetWidth;

        scanLine.classList.add("active");

        setTimeout(() => {

            scanLine.classList.remove("active");

        }, 1300);
    }


    /* =====================================================
       COPY INVITE
       ===================================================== */

    if (copyButton) {

        copyButton.addEventListener(
            "click",
            async () => {

                const inviteLink =
                    "https://www.chess.com/club/hunter-team/join?utm_campaign=club_invite_link&utm_source=chesscom&utm_medium=copy";

                try {

                    await navigator.clipboard.writeText(
                        inviteLink
                    );

                    showCopiedState();

                } catch (error) {

                    fallbackCopy(inviteLink);

                }

            }
        );

    }


    function showCopiedState() {

        if (!copyButton) {
            return;
        }

        copyButton.textContent =
            "✓ LINK COPIED!";

        copyButton.classList.add(
            "copied"
        );

        setTimeout(() => {

            copyButton.textContent =
                "COPY INVITE LINK";

            copyButton.classList.remove(
                "copied"
            );

        }, 1800);
    }


    function fallbackCopy(text) {

        if (!copyButton) {
            return;
        }

        const textarea =
            document.createElement("textarea");

        textarea.value = text;

        textarea.style.position =
            "fixed";

        textarea.style.left =
            "-9999px";

        textarea.style.top =
            "0";

        document.body.appendChild(
            textarea
        );

        textarea.focus();
        textarea.select();

        try {

            document.execCommand(
                "copy"
            );

            showCopiedState();

        } catch (error) {

            copyButton.textContent =
                "COPY FAILED";

            setTimeout(() => {

                copyButton.textContent =
                    "COPY INVITE LINK";

            }, 1800);

        }

        document.body.removeChild(
            textarea
        );
    }


    /* =====================================================
       KEYBOARD CONTROLS
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key.toLowerCase() === "o" &&
                !isTyping(event.target)
            ) {

                toggleDoor();

            }


            if (
                event.key === "Escape" &&
                sidebar?.classList.contains(
                    "door-open"
                )
            ) {

                closeDoor();

            }

        }
    );


    function isTyping(element) {

        if (!element) {
            return false;
        }

        const tag =
            element.tagName?.toLowerCase();

        return (
            tag === "input" ||
            tag === "textarea" ||
            element.isContentEditable
        );
    }

})