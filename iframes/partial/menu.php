<div id="menu">
    <div id="boardActionsDropdown" class="dropdown">
        <button class="dropbtn"><?php require __DIR__ . '/../svg/list.svg'; ?></button>
        <div class="dropdown-content">
            <a href="#"><?php require __DIR__ . '/../svg/arrow-repeat.svg'; ?> Flip Board</a>
            <a href="#"><?php require __DIR__ . '/../svg/card-text.svg'; ?> Copy Movetext</a>
            <a href="#"><?php require __DIR__ . '/../svg/input-cursor.svg'; ?> Copy FEN</a>
        </div>
    </div>
    <div id="historyButtons">
        <button><?php require __DIR__ . '/../svg/skip-backward.svg'; ?></button>
        <button><?php require __DIR__ . '/../svg/caret-left.svg'; ?></button>
        <button><?php require __DIR__ . '/../svg/caret-right.svg'; ?></button>
        <button><?php require __DIR__ . '/../svg/skip-forward.svg'; ?></button>
    </div>
</div>