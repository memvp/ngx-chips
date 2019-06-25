import { Pipe, Injectable, Input, Component, EventEmitter, Output, ViewChild, ContentChildren, forwardRef, HostListener, Injector, TemplateRef, ElementRef, HostBinding, ChangeDetectorRef, Renderer2, ViewChildren, ContentChild, NgModule } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { __awaiter } from 'tslib';
import { filter, first, debounceTime, map } from 'rxjs/operators';
import { Ng2Dropdown, Ng2DropdownModule } from 'ng2-material-dropdown';
import { animate, trigger, style, transition, keyframes, state } from '@angular/animations';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const escape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
class HighlightPipe {
    /**
     * \@name transform
     * @param {?} value {string}
     * @param {?} arg {string}
     * @return {?}
     */
    transform(value, arg) {
        if (!arg.trim()) {
            return value;
        }
        try {
            const /** @type {?} */ regex = new RegExp(`(${escape(arg)})`, 'i');
            return value.replace(regex, '<b>$1</b>');
        }
        catch (/** @type {?} */ e) {
            return value;
        }
    }
}
HighlightPipe.decorators = [
    { type: Pipe, args: [{
                name: 'highlight'
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
** constants and default values for <tag-input>
 */
const PLACEHOLDER = '+ Tag';
const SECONDARY_PLACEHOLDER = 'Enter a new tag';
const KEYDOWN = 'keydown';
const KEYUP = 'keyup';

const MAX_ITEMS_WARNING = 'The number of items specified was greater than the property max-items.';
const ACTIONS_KEYS = {
    DELETE: 'DELETE',
    SWITCH_PREV: 'SWITCH_PREV',
    SWITCH_NEXT: 'SWITCH_NEXT',
    TAB: 'TAB'
};
const KEY_PRESS_ACTIONS = {
    8: ACTIONS_KEYS.DELETE,
    37: ACTIONS_KEYS.SWITCH_PREV,
    39: ACTIONS_KEYS.SWITCH_NEXT,
    9: ACTIONS_KEYS.TAB
};
const DRAG_AND_DROP_KEY = 'Text';
const NEXT = 'NEXT';
const PREV = 'PREV';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DragProvider {
    constructor() {
        this.state = {
            dragging: false,
            dropping: false,
            index: undefined
        };
    }
    /**
     * \@name setDraggedItem
     * @param {?} event
     * @param {?} tag
     * @return {?}
     */
    setDraggedItem(event, tag) {
        event.dataTransfer.setData(DRAG_AND_DROP_KEY, JSON.stringify(tag));
    }
    /**
     * \@name getDraggedItem
     * @param {?} event
     * @return {?}
     */
    getDraggedItem(event) {
        const /** @type {?} */ data = event.dataTransfer.getData(DRAG_AND_DROP_KEY);
        return /** @type {?} */ (JSON.parse(data));
    }
    /**
     * \@name setSender
     * @param {?} sender
     * @return {?}
     */
    setSender(sender) {
        this.sender = sender;
    }
    /**
     * \@name setReceiver
     * @param {?} receiver
     * @return {?}
     */
    setReceiver(receiver) {
        this.receiver = receiver;
    }
    /**
     * \@name onTagDropped
     * @param {?} tag
     * @param {?} indexDragged
     * @param {?=} indexDropped
     * @return {?}
     */
    onTagDropped(tag, indexDragged, indexDropped) {
        this.onDragEnd();
        this.sender.onRemoveRequested(tag, indexDragged);
        this.receiver.onAddingRequested(false, tag, indexDropped);
    }
    /**
     * \@name setState
     * @param {?} state
     * @return {?}
     */
    setState(state$$1) {
        this.state = Object.assign({}, this.state, state$$1);
    }
    /**
     * \@name getState
     * @param {?=} key
     * @return {?}
     */
    getState(key) {
        return key ? this.state[key] : this.state;
    }
    /**
     * \@name onDragEnd
     * @return {?}
     */
    onDragEnd() {
        this.setState({
            dragging: false,
            dropping: false,
            index: undefined
        });
    }
}
DragProvider.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

/**
 * @record
 */

const defaults = {
    tagInput: /** @type {?} */ ({
        separatorKeys: [],
        separatorKeyCodes: [],
        maxItems: Infinity,
        placeholder: PLACEHOLDER,
        secondaryPlaceholder: SECONDARY_PLACEHOLDER,
        validators: [],
        asyncValidators: [],
        onlyFromAutocomplete: false,
        errorMessages: {},
        theme: '',
        onTextChangeDebounce: 250,
        inputId: null,
        inputClass: '',
        clearOnBlur: false,
        hideForm: false,
        addOnBlur: false,
        addOnPaste: false,
        pasteSplitPattern: ',',
        blinkIfDupe: true,
        removable: true,
        editable: false,
        allowDupes: false,
        modelAsStrings: false,
        trimTags: true,
        ripple: true,
        tabIndex: '',
        disable: false,
        dragZone: '',
        onRemoving: undefined,
        onAdding: undefined,
        displayBy: 'display',
        identifyBy: 'value',
        animationDuration: {
            enter: '250ms',
            leave: '150ms'
        }
    }),
    dropdown: /** @type {?} */ ({
        displayBy: 'display',
        identifyBy: 'value',
        appendToBody: true,
        offset: '50 0',
        focusFirstElement: false,
        showDropdownIfEmpty: false,
        minimumTextLength: 1,
        limitItemsTo: Infinity,
        keepOpen: true,
        dynamicUpdate: true,
        zIndex: 1000,
        matchingFn
    })
};
/**
 * \@name matchingFn
 * @this {?}
 * @param {?} value
 * @param {?} target
 * @return {?}
 */
function matchingFn(value, target) {
    const /** @type {?} */ targetValue = target[this.displayBy].toString();
    return targetValue && targetValue
        .toLowerCase()
        .indexOf(value.toLowerCase()) >= 0;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class OptionsProvider {
    /**
     * @param {?} options
     * @return {?}
     */
    setOptions(options) {
        OptionsProvider.defaults.tagInput = Object.assign({}, defaults.tagInput, options.tagInput);
        OptionsProvider.defaults.dropdown = Object.assign({}, defaults.dropdown, options.dropdown);
    }
}
OptionsProvider.defaults = defaults;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @param {?} obj
 * @return {?}
 */
function isObject(obj) {
    return obj === Object(obj);
}
class TagInputAccessor {
    constructor() {
        this._items = [];
        /**
         * \@name displayBy
         */
        this.displayBy = OptionsProvider.defaults.tagInput.displayBy;
        /**
         * \@name identifyBy
         */
        this.identifyBy = OptionsProvider.defaults.tagInput.identifyBy;
    }
    /**
     * @return {?}
     */
    get items() {
        return this._items;
    }
    ;
    /**
     * @param {?} items
     * @return {?}
     */
    set items(items) {
        this._items = items;
        this._onChangeCallback(this._items);
    }
    /**
     * @return {?}
     */
    onTouched() {
        this._onTouchedCallback();
    }
    /**
     * @param {?} items
     * @return {?}
     */
    writeValue(items) {
        this._items = items || [];
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    /**
     * \@name getItemValue
     * @param {?} item
     * @return {?}
     */
    getItemValue(item) {
        return isObject(item) ? item[this.identifyBy] : item;
    }
    /**
     * \@name getItemDisplay
     * @param {?} item
     * @return {?}
     */
    getItemDisplay(item) {
        return isObject(item) ? item[this.displayBy] : item;
    }
    /**
     * \@name getItemsWithout
     * @param {?} index
     * @return {?}
     */
    getItemsWithout(index) {
        return this.items.filter((item, position) => position !== index);
    }
}
TagInputAccessor.propDecorators = {
    "displayBy": [{ type: Input },],
    "identifyBy": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * \@name listen
 * @param {?} listenerType
 * @param {?} action
 * @param {?=} condition
 * @return {?}
 */
function listen(listenerType, action, condition = true) {
    // if the event provided does not exist, throw an error
    if (!this.listeners.hasOwnProperty(listenerType)) {
        throw new Error('The event entered may be wrong');
    }
    // if a condition is present and is false, exit early
    if (!condition) {
        return;
    }
    // fire listener
    this.listeners[listenerType].push(action);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TagInputForm {
    constructor() {
        /**
         * \@name onSubmit
         */
        this.onSubmit = new EventEmitter();
        /**
         * \@name onBlur
         */
        this.onBlur = new EventEmitter();
        /**
         * \@name onFocus
         */
        this.onFocus = new EventEmitter();
        /**
         * \@name onKeyup
         */
        this.onKeyup = new EventEmitter();
        /**
         * \@name onKeydown
         */
        this.onKeydown = new EventEmitter();
        /**
         * \@name inputTextChange
         */
        this.inputTextChange = new EventEmitter();
        /**
         * \@name validators
         */
        this.validators = [];
        /**
         * \@name asyncValidators
         * @desc array of AsyncValidator that are used to validate the tag before it gets appended to the list
         */
        this.asyncValidators = [];
        /**
         * \@name tabindex
         * @desc pass through the specified tabindex to the input
         */
        this.tabindex = '';
        /**
         * \@name disabled
         */
        this.disabled = false;
        this.item = new FormControl({ value: '', disabled: this.disabled });
    }
    /**
     * \@name inputText
     * @return {?}
     */
    get inputText() {
        return this.item.value;
    }
    /**
     * \@name inputText
     * @param {?} text {string}
     * @return {?}
     */
    set inputText(text) {
        this.item.setValue(text);
        this.inputTextChange.emit(text);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.item.setValidators(this.validators);
        this.item.setAsyncValidators(this.asyncValidators);
        // creating form
        this.form = new FormGroup({
            item: this.item
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["disabled"] && !changes["disabled"].firstChange) {
            if (changes["disabled"].currentValue) {
                this.form.controls['item'].disable();
            }
            else {
                this.form.controls['item'].enable();
            }
        }
    }
    /**
     * \@name value
     * @return {?}
     */
    get value() {
        return /** @type {?} */ (this.form.get('item'));
    }
    /**
     * \@name isInputFocused
     * @return {?}
     */
    isInputFocused() {
        return document.activeElement === this.input.nativeElement;
    }
    /**
     * \@name getErrorMessages
     * @param {?} messages
     * @return {?}
     */
    getErrorMessages(messages) {
        return Object.keys(messages)
            .filter(err => this.value.hasError(err))
            .map(err => messages[err]);
    }
    /**
     * \@name hasErrors
     * @return {?}
     */
    hasErrors() {
        const { dirty, value, valid } = this.form;
        return dirty && value.item && !valid;
    }
    /**
     * \@name focus
     * @return {?}
     */
    focus() {
        this.input.nativeElement.focus();
    }
    /**
     * \@name blur
     * @return {?}
     */
    blur() {
        this.input.nativeElement.blur();
    }
    /**
     * \@name getElementPosition
     * @return {?}
     */
    getElementPosition() {
        return this.input.nativeElement.getBoundingClientRect();
    }
    /**
     * - removes input from the component
     * \@name destroy
     * @return {?}
     */
    destroy() {
        const /** @type {?} */ input = this.input.nativeElement;
        input.parentElement.removeChild(input);
    }
    /**
     * \@name onKeyDown
     * @param {?} $event
     * @return {?}
     */
    onKeyDown($event) {
        this.inputText = this.value.value;
        if ($event.key === 'Enter') {
            this.submit($event);
            this.inputText = '';
        }
        return this.onKeydown.emit($event);
    }
    /**
     * \@name onKeyUp
     * @param {?} $event
     * @return {?}
     */
    onKeyUp($event) {
        this.inputText = this.value.value;
        return this.onKeyup.emit($event);
    }
    /**
     * \@name submit
     * @param {?} $event
     * @return {?}
     */
    submit($event) {
        $event.preventDefault();
        if (this.form.valid) {
            this.onSubmit.emit($event);
        }
    }
}
TagInputForm.decorators = [
    { type: Component, args: [{
                selector: 'tag-input-form',
                styles: [`.dark tag:focus{-webkit-box-shadow:0 0 0 1px #323232;box-shadow:0 0 0 1px #323232}.ng2-tag-input.bootstrap3-info{background-color:#fff;display:inline-block;color:#555;vertical-align:middle;max-width:100%;height:42px;line-height:44px}.ng2-tag-input.bootstrap3-info input{border:none;-webkit-box-shadow:none;box-shadow:none;outline:0;background-color:transparent;padding:0 6px;margin:0;width:auto;max-width:inherit}.ng2-tag-input.bootstrap3-info .form-control input::-moz-placeholder{color:#777;opacity:1}.ng2-tag-input.bootstrap3-info .form-control input:-ms-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info .form-control input::-webkit-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info input:focus{border:none;-webkit-box-shadow:none;box-shadow:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--focused{-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.4);box-shadow:inset 0 1px 1px rgba(0,0,0,.4);border:1px solid #ccc}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{-webkit-box-shadow:inset 0 1px 1px #d9534f;box-shadow:inset 0 1px 1px #d9534f}.ng2-tag-input{display:block;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;-webkit-transition:all .25s;transition:all .25s;padding:.25rem 0;min-height:32px;cursor:text;border-bottom:2px solid #efefef}.ng2-tag-input:focus{outline:0}.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #2196f3}.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #f44336}.ng2-tag-input.ng2-tag-input--loading{border:none}.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.ng2-tag-input form{margin:.1em 0}.ng2-tag-input .ng2-tags-container{-ms-flex-wrap:wrap;flex-wrap:wrap;display:-webkit-box;display:-ms-flexbox;display:flex}.minimal.ng2-tag-input{display:block;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;cursor:text;border-bottom:1px solid transparent}.minimal.ng2-tag-input:focus{outline:0}.minimal.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.minimal.ng2-tag-input.ng2-tag-input--loading{border:none}.minimal.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.minimal.ng2-tag-input .ng2-tags-container{-ms-flex-wrap:wrap;flex-wrap:wrap;display:-webkit-box;display:-ms-flexbox;display:flex}.dark.ng2-tag-input{display:block;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #444}.dark.ng2-tag-input:focus{outline:0}.dark.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.dark.ng2-tag-input.ng2-tag-input--loading{border:none}.dark.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.dark.ng2-tag-input .ng2-tags-container{-ms-flex-wrap:wrap;flex-wrap:wrap;display:-webkit-box;display:-ms-flexbox;display:flex}.bootstrap.ng2-tag-input{display:block;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #efefef}.bootstrap.ng2-tag-input:focus{outline:0}.bootstrap.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #0275d8}.bootstrap.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #d9534f}.bootstrap.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap.ng2-tag-input .ng2-tags-container{-ms-flex-wrap:wrap;flex-wrap:wrap;display:-webkit-box;display:-ms-flexbox;display:flex}.bootstrap3-info.ng2-tag-input{display:block;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;padding:4px;cursor:text;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);border-radius:4px}.bootstrap3-info.ng2-tag-input:focus{outline:0}.bootstrap3-info.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{border-bottom:1px solid #d9534f}.bootstrap3-info.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap3-info.ng2-tag-input form{margin:.1em 0}.bootstrap3-info.ng2-tag-input .ng2-tags-container{-ms-flex-wrap:wrap;flex-wrap:wrap;display:-webkit-box;display:-ms-flexbox;display:flex}.error-message{font-size:.8em;color:#f44336;margin:.5em 0 0}.bootstrap .error-message{color:#d9534f}.ng2-tag-input__text-input{display:inline;vertical-align:middle;border:none;padding:0 .5rem;height:38px;font-size:1em;font-family:Roboto,"Helvetica Neue",sans-serif}.ng2-tag-input__text-input:focus{outline:0}.ng2-tag-input__text-input[disabled=true]{opacity:.5;background:#fff}`],
                template: `<!-- form -->
<form (ngSubmit)="submit($event)" [formGroup]="form">
    <input #input

           type="text"
           class="ng2-tag-input__text-input"
           autocomplete="off"
           tabindex="{{ disabled ? -1 : tabindex ? tabindex : 0 }}"
           minlength="1"
           formControlName="item"

           [ngClass]="inputClass"
           [attr.id]="inputId"
           [attr.placeholder]="placeholder"
           [attr.aria-label]="placeholder"
           [attr.tabindex]="tabindex"
           [attr.disabled]="disabled ? disabled : null"

           (focus)="onFocus.emit($event)"
           (blur)="onBlur.emit($event)"
           (keydown)="onKeyDown($event)"
           (keyup)="onKeyUp($event)"
    />
</form>
`
            },] },
];
/** @nocollapse */
TagInputForm.propDecorators = {
    "onSubmit": [{ type: Output },],
    "onBlur": [{ type: Output },],
    "onFocus": [{ type: Output },],
    "onKeyup": [{ type: Output },],
    "onKeydown": [{ type: Output },],
    "inputTextChange": [{ type: Output },],
    "placeholder": [{ type: Input },],
    "validators": [{ type: Input },],
    "asyncValidators": [{ type: Input },],
    "inputId": [{ type: Input },],
    "inputClass": [{ type: Input },],
    "tabindex": [{ type: Input },],
    "disabled": [{ type: Input },],
    "input": [{ type: ViewChild, args: ['input',] },],
    "inputText": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const defaults$1 = forwardRef(() => OptionsProvider.defaults.dropdown);
class TagInputDropdown {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.injector = injector;
        /**
         * \@name offset
         */
        this.offset = new defaults$1().offset;
        /**
         * \@name focusFirstElement
         */
        this.focusFirstElement = new defaults$1().focusFirstElement;
        /**
         * - show autocomplete dropdown if the value of input is empty
         * \@name showDropdownIfEmpty
         */
        this.showDropdownIfEmpty = new defaults$1().showDropdownIfEmpty;
        /**
         * - desc minimum text length in order to display the autocomplete dropdown
         * \@name minimumTextLength
         */
        this.minimumTextLength = new defaults$1().minimumTextLength;
        /**
         * - number of items to display in the autocomplete dropdown
         * \@name limitItemsTo
         */
        this.limitItemsTo = new defaults$1().limitItemsTo;
        /**
         * \@name displayBy
         */
        this.displayBy = new defaults$1().displayBy;
        /**
         * \@name identifyBy
         */
        this.identifyBy = new defaults$1().identifyBy;
        /**
         * \@description a function a developer can use to implement custom matching for the autocomplete
         * \@name matchingFn
         */
        this.matchingFn = new defaults$1().matchingFn;
        /**
         * \@name appendToBody
         */
        this.appendToBody = new defaults$1().appendToBody;
        /**
         * \@name keepOpen
         * \@description option to leave dropdown open when adding a new item
         */
        this.keepOpen = new defaults$1().keepOpen;
        /**
         * \@name dynamicUpdate
         */
        this.dynamicUpdate = new defaults$1().dynamicUpdate;
        /**
         * \@name zIndex
         */
        this.zIndex = new defaults$1().zIndex;
        /**
         * list of items that match the current value of the input (for autocomplete)
         * \@name items
         */
        this.items = [];
        /**
         * \@name tagInput
         */
        this.tagInput = this.injector.get(TagInputComponent);
        /**
         * \@name _autocompleteItems
         */
        this._autocompleteItems = [];
        /**
         *
         * \@name show
         */
        this.show = () => {
            const /** @type {?} */ maxItemsReached = this.tagInput.items.length === this.tagInput.maxItems;
            const /** @type {?} */ value = this.getFormValue();
            const /** @type {?} */ hasMinimumText = value.trim().length >= this.minimumTextLength;
            const /** @type {?} */ position = this.calculatePosition();
            const /** @type {?} */ items = this.getMatchingItems(value);
            const /** @type {?} */ hasItems = items.length > 0;
            const /** @type {?} */ isHidden = this.isVisible === false;
            const /** @type {?} */ showDropdownIfEmpty = this.showDropdownIfEmpty && hasItems && !value;
            const /** @type {?} */ isDisabled = this.tagInput.disable;
            const /** @type {?} */ shouldShow = isHidden && ((hasItems && hasMinimumText) || showDropdownIfEmpty);
            const /** @type {?} */ shouldHide = this.isVisible && !hasItems;
            if (this.autocompleteObservable && hasMinimumText) {
                return this.getItemsFromObservable(value);
            }
            if ((!this.showDropdownIfEmpty && !value) || maxItemsReached || isDisabled) {
                return this.dropdown.hide();
            }
            this.setItems(items);
            if (shouldShow) {
                this.dropdown.show(position);
            }
            else if (shouldHide) {
                this.hide();
            }
        };
        /**
         * \@name requestAdding
         * @param item {Ng2MenuItem}
         */
        this.requestAdding = (item) => __awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = this.createTagModel(item);
            yield this.tagInput.onAddingRequested(true, tag).catch(() => { });
        });
        /**
         * \@name resetItems
         */
        this.resetItems = () => {
            this.items = [];
        };
        /**
         * \@name getItemsFromObservable
         * @param text
         */
        this.getItemsFromObservable = (text) => {
            this.setLoadingState(true);
            const /** @type {?} */ subscribeFn = (data) => {
                // hide loading animation
                this.setLoadingState(false)
                    .populateItems(data);
                this.setItems(this.getMatchingItems(text));
                if (this.items.length) {
                    this.dropdown.show(this.calculatePosition());
                }
                else if (!this.showDropdownIfEmpty && this.isVisible) {
                    this.dropdown.hide();
                }
                else if (!this.showDropdownIfEmpty) {
                    this.dropdown.hide();
                }
            };
            this.autocompleteObservable(text)
                .pipe(first())
                .subscribe(subscribeFn, () => this.setLoadingState(false));
        };
    }
    /**
     * \@name autocompleteItems
     * @param {?} items
     * @return {?}
     */
    set autocompleteItems(items) {
        this._autocompleteItems = items;
    }
    /**
     * \@name autocompleteItems
     * @desc array of items that will populate the autocomplete
     * @return {?}
     */
    get autocompleteItems() {
        const /** @type {?} */ items = this._autocompleteItems;
        if (!items) {
            return [];
        }
        return items.map((item) => {
            return typeof item === 'string' ? {
                [this.displayBy]: item,
                [this.identifyBy]: item
            } : item;
        });
    }
    /**
     * \@name ngOnInit
     * @return {?}
     */
    ngOnInit() {
        this.onItemClicked().subscribe((item) => {
            this.requestAdding(item);
        });
        // reset itemsMatching array when the dropdown is hidden
        this.onHide().subscribe(this.resetItems);
        const /** @type {?} */ DEBOUNCE_TIME = 200;
        const /** @type {?} */ KEEP_OPEN = this.keepOpen;
        this.tagInput
            .onTextChange
            .asObservable()
            .pipe(debounceTime(DEBOUNCE_TIME), filter((value) => {
            if (KEEP_OPEN === false) {
                return value.length > 0;
            }
            return true;
        }))
            .subscribe(this.show);
    }
    /**
     * \@name updatePosition
     * @return {?}
     */
    updatePosition() {
        const /** @type {?} */ position = this.tagInput.inputForm.getElementPosition();
        this.dropdown.menu.updatePosition(position, this.dynamicUpdate);
    }
    /**
     * \@name isVisible
     * @return {?}
     */
    get isVisible() {
        return this.dropdown.menu.state.menuState.isVisible;
    }
    /**
     * \@name onHide
     * @return {?}
     */
    onHide() {
        return this.dropdown.onHide;
    }
    /**
     * \@name onItemClicked
     * @return {?}
     */
    onItemClicked() {
        return this.dropdown.onItemClicked;
    }
    /**
     * \@name selectedItem
     * @return {?}
     */
    get selectedItem() {
        return this.dropdown.menu.state.dropdownState.selectedItem;
    }
    /**
     * \@name state
     * @return {?}
     */
    get state() {
        return this.dropdown.menu.state;
    }
    /**
     * \@name hide
     * @return {?}
     */
    hide() {
        this.resetItems();
        this.dropdown.hide();
    }
    /**
     * \@name scrollListener
     * @return {?}
     */
    scrollListener() {
        if (!this.isVisible || !this.dynamicUpdate) {
            return;
        }
        this.updatePosition();
    }
    /**
     * \@name onWindowBlur
     * @return {?}
     */
    onWindowBlur() {
        this.dropdown.hide();
    }
    /**
     * \@name getFormValue
     * @return {?}
     */
    getFormValue() {
        return this.tagInput.formValue.trim();
    }
    /**
     * \@name calculatePosition
     * @return {?}
     */
    calculatePosition() {
        return this.tagInput.inputForm.getElementPosition();
    }
    /**
     * \@name createTagModel
     * @param {?} item
     * @return {?}
     */
    createTagModel(item) {
        const /** @type {?} */ display = typeof item.value === 'string' ? item.value : item.value[this.displayBy];
        const /** @type {?} */ value = typeof item.value === 'string' ? item.value : item.value[this.identifyBy];
        return Object.assign({}, item.value, { [this.tagInput.displayBy]: display, [this.tagInput.identifyBy]: value });
    }
    /**
     *
     * @param {?} value {string}
     * @return {?}
     */
    getMatchingItems(value) {
        if (!value && !this.showDropdownIfEmpty) {
            return [];
        }
        const /** @type {?} */ dupesAllowed = this.tagInput.allowDupes;
        return this.autocompleteItems.filter((item) => {
            const /** @type {?} */ hasValue = dupesAllowed ? false : this.tagInput.tags.some(tag => {
                const /** @type {?} */ identifyBy = this.tagInput.identifyBy;
                const /** @type {?} */ model = typeof tag.model === 'string' ? tag.model : tag.model[identifyBy];
                return model === item[this.identifyBy];
            });
            return this.matchingFn(value, item) && (hasValue === false);
        });
    }
    /**
     * \@name setItems
     * @param {?} items
     * @return {?}
     */
    setItems(items) {
        this.items = items.slice(0, this.limitItemsTo || items.length);
    }
    /**
     * \@name populateItems
     * @param {?} data
     * @return {?}
     */
    populateItems(data) {
        this.autocompleteItems = data.map(item => {
            return typeof item === 'string' ? {
                [this.displayBy]: item,
                [this.identifyBy]: item
            } : item;
        });
        return this;
    }
    /**
     * \@name setLoadingState
     * @param {?} state
     * @return {?}
     */
    setLoadingState(state$$1) {
        this.tagInput.isLoading = state$$1;
        return this;
    }
}
TagInputDropdown.decorators = [
    { type: Component, args: [{
                selector: 'tag-input-dropdown',
                template: `<ng2-dropdown [dynamicUpdate]="dynamicUpdate">
    <ng2-dropdown-menu [focusFirstElement]="focusFirstElement"
                       [zIndex]="zIndex"
                       [appendToBody]="appendToBody"
                       [offset]="offset">
        <ng2-menu-item *ngFor="let item of items; let index = index; let last = last"
                       [value]="item"
                       [ngSwitch]="!!templates.length">

            <span *ngSwitchCase="false"
                  [innerHTML]="item[displayBy] | highlight : tagInput.inputForm.value.value">
            </span>

            <ng-template *ngSwitchDefault
                      [ngTemplateOutlet]="templates.first"
                      [ngTemplateOutletContext]="{ item: item, index: index, last: last }">
            </ng-template>
        </ng2-menu-item>
    </ng2-dropdown-menu>
</ng2-dropdown>
`
            },] },
];
/** @nocollapse */
TagInputDropdown.ctorParameters = () => [
    { type: Injector, },
];
TagInputDropdown.propDecorators = {
    "dropdown": [{ type: ViewChild, args: [Ng2Dropdown,] },],
    "templates": [{ type: ContentChildren, args: [TemplateRef,] },],
    "offset": [{ type: Input },],
    "focusFirstElement": [{ type: Input },],
    "showDropdownIfEmpty": [{ type: Input },],
    "autocompleteObservable": [{ type: Input },],
    "minimumTextLength": [{ type: Input },],
    "limitItemsTo": [{ type: Input },],
    "displayBy": [{ type: Input },],
    "identifyBy": [{ type: Input },],
    "matchingFn": [{ type: Input },],
    "appendToBody": [{ type: Input },],
    "keepOpen": [{ type: Input },],
    "dynamicUpdate": [{ type: Input },],
    "zIndex": [{ type: Input },],
    "autocompleteItems": [{ type: Input },],
    "scrollListener": [{ type: HostListener, args: ['window:scroll',] },],
    "onWindowBlur": [{ type: HostListener, args: ['window:blur',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TagRipple {
    constructor() {
        this.state = 'none';
    }
}
TagRipple.decorators = [
    { type: Component, args: [{
                selector: 'tag-ripple',
                styles: [`
        :host {
            width: 100%;
            height: 100%;
            left: 0;
            overflow: hidden;
            position: absolute;
        }
        
        .tag-ripple {
            background: rgba(0, 0, 0, 0.1);
            top: 50%;
            left: 50%;
            height: 100%;
            transform: translate(-50%, -50%);
            position: absolute;
        }
    `],
                template: `
        <div class="tag-ripple" [@ink]="state"></div>
    `,
                animations: [
                    trigger('ink', [
                        state('none', style({ width: 0, opacity: 0 })),
                        transition('none => clicked', [
                            animate(300, keyframes([
                                style({ opacity: 1, offset: 0, width: '30%', borderRadius: '100%' }),
                                style({ opacity: 1, offset: 0.5, width: '50%' }),
                                style({ opacity: 0.5, offset: 1, width: '100%', borderRadius: '16px' })
                            ]))
                        ])
                    ])
                ]
            },] },
];
/** @nocollapse */
TagRipple.propDecorators = {
    "state": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// angular universal hacks
/* tslint:disable-next-line */
const KeyboardEvent = (/** @type {?} */ (window)).KeyboardEvent;
const MouseEvent = (/** @type {?} */ (window)).MouseEvent;
// mocking navigator
const navigator = typeof window !== 'undefined' ? window.navigator : {
    userAgent: 'Chrome',
    vendor: 'Google Inc'
};
const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
class TagComponent {
    /**
     * @param {?} element
     * @param {?} renderer
     * @param {?} cdRef
     */
    constructor(element, renderer, cdRef) {
        this.element = element;
        this.renderer = renderer;
        this.cdRef = cdRef;
        /**
         * \@name disabled
         */
        this.disabled = false;
        /**
         * \@name onSelect
         */
        this.onSelect = new EventEmitter();
        /**
         * \@name onRemove
         */
        this.onRemove = new EventEmitter();
        /**
         * \@name onBlur
         */
        this.onBlur = new EventEmitter();
        /**
         * \@name onKeyDown
         */
        this.onKeyDown = new EventEmitter();
        /**
         * \@name onTagEdited
         */
        this.onTagEdited = new EventEmitter();
        /**
         * \@name editing
         */
        this.editing = false;
        /**
         * \@name rippleState
         */
        this.rippleState = 'none';
    }
    /**
     * \@name readonly {boolean}
     * @return {?}
     */
    get readonly() {
        return typeof this.model !== 'string' && this.model["readonly"] === true;
    }
    ;
    /**
     * \@name select
     * @param {?=} $event
     * @return {?}
     */
    select($event) {
        if (this.readonly || this.disabled) {
            return;
        }
        if ($event) {
            $event.stopPropagation();
        }
        this.focus();
        this.onSelect.emit(this.model);
    }
    /**
     * \@name remove
     * @param {?} $event
     * @return {?}
     */
    remove($event) {
        $event.stopPropagation();
        this.onRemove.emit(this);
    }
    /**
     * \@name focus
     * @return {?}
     */
    focus() {
        this.element.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    move() {
        this.moving = true;
    }
    /**
     * \@name keydown
     * @param {?} event
     * @return {?}
     */
    keydown(event) {
        if (this.editing) {
            event.keyCode === 13 ? this.disableEditMode(event) : undefined;
            return;
        }
        this.onKeyDown.emit({ event, model: this.model });
    }
    /**
     * \@name blink
     * @return {?}
     */
    blink() {
        const /** @type {?} */ classList = this.element.nativeElement.classList;
        classList.add('blink');
        setTimeout(() => classList.remove('blink'), 50);
    }
    /**
     * \@name toggleEditMode
     * @return {?}
     */
    toggleEditMode() {
        if (this.editable) {
            this.editing ? undefined : this.activateEditMode();
        }
    }
    /**
     * \@name onBlurred
     * @param {?} event
     * @return {?}
     */
    onBlurred(event) {
        // Checks if it is editable first before handeling the onBlurred event in order to prevent
        // a bug in IE where tags are still editable with onlyFromAutocomplete set to true
        if (!this.editable) {
            return;
        }
        this.disableEditMode();
        const /** @type {?} */ value = event.target.innerText;
        const /** @type {?} */ result = typeof this.model === 'string' ? value : Object.assign({}, this.model, { [this.displayBy]: value });
        this.onBlur.emit(result);
    }
    /**
     * \@name getDisplayValue
     * @param {?} item
     * @return {?}
     */
    getDisplayValue(item) {
        return typeof item === 'string' ? item : item[this.displayBy];
    }
    /**
     * @desc returns whether the ripple is visible or not
     * only works in Chrome
     * \@name isRippleVisible
     * @return {?}
     */
    get isRippleVisible() {
        return !this.readonly &&
            !this.editing &&
            isChrome &&
            this.hasRipple;
    }
    /**
     * \@name disableEditMode
     * @param {?=} $event
     * @return {?}
     */
    disableEditMode($event) {
        const /** @type {?} */ classList = this.element.nativeElement.classList;
        const /** @type {?} */ input = this.getContentEditableText();
        this.editing = false;
        classList.remove('tag--editing');
        if (!input) {
            this.setContentEditableText(this.model);
            return;
        }
        this.storeNewValue(input);
        this.cdRef.detectChanges();
        if ($event) {
            $event.preventDefault();
        }
    }
    /**
     * \@name isDeleteIconVisible
     * @return {?}
     */
    isDeleteIconVisible() {
        return !this.readonly &&
            !this.disabled &&
            this.removable &&
            !this.editing;
    }
    /**
     * \@name getContentEditableText
     * @return {?}
     */
    getContentEditableText() {
        const /** @type {?} */ input = this.getContentEditable();
        return input ? input.innerText.trim() : '';
    }
    /**
     * \@name setContentEditableText
     * @param {?} model
     * @return {?}
     */
    setContentEditableText(model) {
        const /** @type {?} */ input = this.getContentEditable();
        const /** @type {?} */ value = this.getDisplayValue(model);
        input.innerText = value;
    }
    /**
     * \@name
     * @return {?}
     */
    activateEditMode() {
        const /** @type {?} */ classList = this.element.nativeElement.classList;
        classList.add('tag--editing');
        this.editing = true;
    }
    /**
     * \@name storeNewValue
     * @param {?} input
     * @return {?}
     */
    storeNewValue(input) {
        const /** @type {?} */ exists = (tag) => {
            return typeof tag === 'string' ?
                tag === input :
                tag[this.displayBy] === input;
        };
        const /** @type {?} */ hasId = () => {
            return this.model[this.identifyBy] !== this.model[this.displayBy];
        };
        // if the value changed, replace the value in the model
        if (exists(this.model)) {
            return;
        }
        const /** @type {?} */ model = typeof this.model === 'string' ? input :
            {
                index: this.index,
                [this.identifyBy]: hasId() ? this.model[this.identifyBy] : input,
                [this.displayBy]: input,
            };
        if (this.canAddTag(model)) {
            this.onTagEdited.emit({ tag: model, index: this.index });
        }
        else {
            this.setContentEditableText(this.model);
        }
    }
    /**
     * \@name getContentEditable
     * @return {?}
     */
    getContentEditable() {
        return this.element.nativeElement.querySelector('[contenteditable]');
    }
}
TagComponent.decorators = [
    { type: Component, args: [{
                selector: 'tag',
                template: `<div (click)="select($event)"
     (dblclick)="toggleEditMode()"
     (mousedown)="rippleState='clicked'"
     (mouseup)="rippleState='none'"
     [ngSwitch]="!!template"
     [class.disabled]="disabled"
     [attr.tabindex]="-1"
     [attr.aria-label]="getDisplayValue(model)">

    <div *ngSwitchCase="true" [attr.contenteditable]="editing">
        <!-- CUSTOM TEMPLATE -->
        <ng-template
            [ngTemplateOutletContext]="{ item: model, index: index }"
            [ngTemplateOutlet]="template">
        </ng-template>
    </div>

    <div *ngSwitchCase="false" class="tag-wrapper">
        <!-- TAG NAME -->
        <div [attr.contenteditable]="editing"
             [attr.title]="getDisplayValue(model)"
             class="tag__text inline"
             spellcheck="false"
             (keydown.enter)="disableEditMode($event)"
             (keydown.escape)="disableEditMode($event)"
             (click)="editing ? $event.stopPropagation() : undefined"
             (blur)="onBlurred($event)">
            {{ getDisplayValue(model) }}
        </div>

        <!-- 'X' BUTTON -->
        <delete-icon
            aria-label="Remove tag"
            role="button"
            (click)="remove($event)"
            *ngIf="isDeleteIconVisible()">
        </delete-icon>
    </div>
</div>

<tag-ripple [state]="rippleState"
            [attr.tabindex]="-1"
            *ngIf="isRippleVisible">
</tag-ripple>
`,
                styles: [`:host,:host>div,:host>div:focus{outline:0;overflow:hidden;-webkit-transition:opacity 1s;transition:opacity 1s;z-index:1}:host{max-width:400px}:host.blink{-webkit-animation:.3s ease-in-out forwards blink;animation:.3s ease-in-out forwards blink}@-webkit-keyframes blink{0%{opacity:.3}}@keyframes blink{0%{opacity:.3}}:host .disabled{cursor:not-allowed}:host [contenteditable=true]{outline:0}.tag-wrapper{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;display:-webkit-box;display:-ms-flexbox;display:flex}.tag__text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}`]
            },] },
];
/** @nocollapse */
TagComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: ChangeDetectorRef, },
];
TagComponent.propDecorators = {
    "model": [{ type: Input },],
    "removable": [{ type: Input },],
    "editable": [{ type: Input },],
    "template": [{ type: Input },],
    "displayBy": [{ type: Input },],
    "identifyBy": [{ type: Input },],
    "index": [{ type: Input },],
    "hasRipple": [{ type: Input },],
    "disabled": [{ type: Input },],
    "canAddTag": [{ type: Input },],
    "onSelect": [{ type: Output },],
    "onRemove": [{ type: Output },],
    "onBlur": [{ type: Output },],
    "onKeyDown": [{ type: Output },],
    "onTagEdited": [{ type: Output },],
    "moving": [{ type: HostBinding, args: ['class.moving',] },],
    "ripple": [{ type: ViewChild, args: [TagRipple,] },],
    "keydown": [{ type: HostListener, args: ['keydown', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * \@name animations
 */
const animations = [
    trigger('animation', [
        state('in', style({
            opacity: 1
        })),
        state('out', style({
            opacity: 0
        })),
        transition(':enter', [
            animate("{{ enter }}", keyframes([
                style({ opacity: 0, offset: 0, transform: 'translate(0px, 20px)' }),
                style({ opacity: 0.3, offset: 0.3, transform: 'translate(0px, -10px)' }),
                style({ opacity: 0.5, offset: 0.5, transform: 'translate(0px, 0px)' }),
                style({ opacity: 0.75, offset: 0.75, transform: 'translate(0px, 5px)' }),
                style({ opacity: 1, offset: 1, transform: 'translate(0px, 0px)' })
            ]))
        ]),
        transition(':leave', [
            animate("{{ leave }}", keyframes([
                style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
                style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
            ]))
        ])
    ])
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// angular universal hacks
/* tslint:disable-next-line */
const DragEvent = (/** @type {?} */ (window)).DragEvent;
const CUSTOM_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagInputComponent),
    multi: true
};
const defaults$2 = forwardRef(() => OptionsProvider.defaults.tagInput);
class TagInputComponent extends TagInputAccessor {
    /**
     * @param {?} renderer
     * @param {?} dragProvider
     */
    constructor(renderer, dragProvider) {
        super();
        this.renderer = renderer;
        this.dragProvider = dragProvider;
        /**
         * \@name separatorKeys
         * @desc keyboard keys with which a user can separate items
         */
        this.separatorKeys = new defaults$2().separatorKeys;
        /**
         * \@name separatorKeyCodes
         * @desc keyboard key codes with which a user can separate items
         */
        this.separatorKeyCodes = new defaults$2().separatorKeyCodes;
        /**
         * \@name placeholder
         * @desc the placeholder of the input text
         */
        this.placeholder = new defaults$2().placeholder;
        /**
         * \@name secondaryPlaceholder
         * @desc placeholder to appear when the input is empty
         */
        this.secondaryPlaceholder = new defaults$2().secondaryPlaceholder;
        /**
         * \@name maxItems
         * @desc maximum number of items that can be added
         */
        this.maxItems = new defaults$2().maxItems;
        /**
         * \@name validators
         * @desc array of Validators that are used to validate the tag before it gets appended to the list
         */
        this.validators = new defaults$2().validators;
        /**
         * \@name asyncValidators
         * @desc array of AsyncValidator that are used to validate the tag before it gets appended to the list
         */
        this.asyncValidators = new defaults$2().asyncValidators;
        /**
         * - if set to true, it will only possible to add items from the autocomplete
         * \@name onlyFromAutocomplete
         */
        this.onlyFromAutocomplete = new defaults$2().onlyFromAutocomplete;
        /**
         * \@name errorMessages
         */
        this.errorMessages = new defaults$2().errorMessages;
        /**
         * \@name theme
         */
        this.theme = new defaults$2().theme;
        /**
         * \@name onTextChangeDebounce
         */
        this.onTextChangeDebounce = new defaults$2().onTextChangeDebounce;
        /**
         * - custom id assigned to the input
         * \@name id
         */
        this.inputId = new defaults$2().inputId;
        /**
         * - custom class assigned to the input
         */
        this.inputClass = new defaults$2().inputClass;
        /**
         * - option to clear text input when the form is blurred
         * \@name clearOnBlur
         */
        this.clearOnBlur = new defaults$2().clearOnBlur;
        /**
         * - hideForm
         * \@name clearOnBlur
         */
        this.hideForm = new defaults$2().hideForm;
        /**
         * \@name addOnBlur
         */
        this.addOnBlur = new defaults$2().addOnBlur;
        /**
         * \@name addOnPaste
         */
        this.addOnPaste = new defaults$2().addOnPaste;
        /**
         * - pattern used with the native method split() to separate patterns in the string pasted
         * \@name pasteSplitPattern
         */
        this.pasteSplitPattern = new defaults$2().pasteSplitPattern;
        /**
         * \@name blinkIfDupe
         */
        this.blinkIfDupe = new defaults$2().blinkIfDupe;
        /**
         * \@name removable
         */
        this.removable = new defaults$2().removable;
        /**
         * \@name editable
         */
        this.editable = new defaults$2().editable;
        /**
         * \@name allowDupes
         */
        this.allowDupes = new defaults$2().allowDupes;
        /**
         * \@description if set to true, the newly added tags will be added as strings, and not objects
         * \@name modelAsStrings
         */
        this.modelAsStrings = new defaults$2().modelAsStrings;
        /**
         * \@name trimTags
         */
        this.trimTags = new defaults$2().trimTags;
        /**
         * \@name ripple
         */
        this.ripple = new defaults$2().ripple;
        /**
         * \@name tabindex
         * @desc pass through the specified tabindex to the input
         */
        this.tabindex = new defaults$2().tabIndex;
        /**
         * \@name disable
         */
        this.disable = new defaults$2().disable;
        /**
         * \@name dragZone
         */
        this.dragZone = new defaults$2().dragZone;
        /**
         * \@name onRemoving
         */
        this.onRemoving = new defaults$2().onRemoving;
        /**
         * \@name onAdding
         */
        this.onAdding = new defaults$2().onAdding;
        /**
         * \@name animationDuration
         */
        this.animationDuration = new defaults$2().animationDuration;
        /**
         * \@name onAdd
         * @desc event emitted when adding a new item
         */
        this.onAdd = new EventEmitter();
        /**
         * \@name onRemove
         * @desc event emitted when removing an existing item
         */
        this.onRemove = new EventEmitter();
        /**
         * \@name onSelect
         * @desc event emitted when selecting an item
         */
        this.onSelect = new EventEmitter();
        /**
         * \@name onFocus
         * @desc event emitted when the input is focused
         */
        this.onFocus = new EventEmitter();
        /**
         * \@name onFocus
         * @desc event emitted when the input is blurred
         */
        this.onBlur = new EventEmitter();
        /**
         * \@name onTextChange
         * @desc event emitted when the input value changes
         */
        this.onTextChange = new EventEmitter();
        /**
         * - output triggered when text is pasted in the form
         * \@name onPaste
         */
        this.onPaste = new EventEmitter();
        /**
         * - output triggered when tag entered is not valid
         * \@name onValidationError
         */
        this.onValidationError = new EventEmitter();
        /**
         * - output triggered when tag is edited
         * \@name onTagEdited
         */
        this.onTagEdited = new EventEmitter();
        /**
         * \@name isLoading
         */
        this.isLoading = false;
        /**
         * \@name listeners
         * @desc array of events that get fired using \@fireEvents
         */
        this.listeners = {
            [KEYDOWN]: /** @type {?} */ ([]),
            [KEYUP]: /** @type {?} */ ([])
        };
        /**
         * \@description emitter for the 2-way data binding inputText value
         * \@name inputTextChange
         */
        this.inputTextChange = new EventEmitter();
        /**
         * \@description private variable to bind get/set
         * \@name inputTextValue
         */
        this.inputTextValue = '';
        this.errors = [];
        /**
         * \@name appendTag
         * @param tag {TagModel}
         */
        this.appendTag = (tag, index = this.items.length) => {
            const /** @type {?} */ items = this.items;
            const /** @type {?} */ model = this.modelAsStrings ? tag[this.identifyBy] : tag;
            this.items = [
                ...items.slice(0, index),
                model,
                ...items.slice(index, items.length)
            ];
        };
        /**
         * \@name createTag
         * @param model
         */
        this.createTag = (model) => {
            const /** @type {?} */ trim = (val, key) => {
                return typeof val === 'string' ? val.trim() : val[key];
            };
            return Object.assign({}, typeof model !== 'string' ? model : {}, { [this.displayBy]: this.trimTags ? trim(model, this.displayBy) : model, [this.identifyBy]: this.trimTags ? trim(model, this.identifyBy) : model });
        };
        /**
         *
         * @param tag
         * @param isFromAutocomplete
         */
        this.isTagValid = (tag, fromAutocomplete = false) => {
            const /** @type {?} */ selectedItem = this.dropdown ? this.dropdown.selectedItem : undefined;
            const /** @type {?} */ value = this.getItemDisplay(tag).trim();
            if (selectedItem && !fromAutocomplete || !value) {
                return false;
            }
            const /** @type {?} */ dupe = this.findDupe(tag, fromAutocomplete);
            // if so, give a visual cue and return false
            if (!this.allowDupes && dupe && this.blinkIfDupe) {
                const /** @type {?} */ model = this.tags.find(item => {
                    return this.getItemValue(item.model) === this.getItemValue(dupe);
                });
                if (model) {
                    model.blink();
                }
            }
            const /** @type {?} */ isFromAutocomplete = fromAutocomplete && this.onlyFromAutocomplete;
            const /** @type {?} */ assertions = [
                // 1. there must be no dupe OR dupes are allowed
                !dupe || this.allowDupes === true,
                // 2. check max items has not been reached
                this.maxItemsReached === false,
                // 3. check item comes from autocomplete or onlyFromAutocomplete is false
                ((isFromAutocomplete) || this.onlyFromAutocomplete === false)
            ];
            return assertions.filter(item => item).length === assertions.length;
        };
        /**
         * \@name onPasteCallback
         * @param data
         */
        this.onPasteCallback = (data) => __awaiter(this, void 0, void 0, function* () {
            /**
             * @record
             */
            const /** @type {?} */ getText = () => {
                const /** @type {?} */ isIE = Boolean((/** @type {?} */ (window)).clipboardData);
                const /** @type {?} */ clipboardData = isIE ? ((/** @type {?} */ (window)).clipboardData) : data.clipboardData;
                const /** @type {?} */ type = isIE ? 'Text' : 'text/plain';
                return clipboardData.getData(type) || '';
            };
            const /** @type {?} */ text = getText();
            const /** @type {?} */ requests = text
                .split(this.pasteSplitPattern)
                .map(item => {
                const /** @type {?} */ tag = this.createTag(item);
                this.setInputValue(tag[this.displayBy]);
                return this.onAddingRequested(false, tag);
            });
            const /** @type {?} */ resetInput = () => setTimeout(() => this.setInputValue(''), 50);
            Promise.all(requests).then(() => {
                this.onPaste.emit(text);
                resetInput();
            })
                .catch(resetInput);
        });
    }
    /**
     * \@name inputText
     * @return {?}
     */
    get inputText() {
        return this.inputTextValue;
    }
    /**
     * \@name inputText
     * @param {?} text
     * @return {?}
     */
    set inputText(text) {
        this.inputTextValue = text;
        this.inputTextChange.emit(text);
    }
    /**
     * @desc removes the tab index if it is set - it will be passed through to the input
     * \@name tabindexAttr
     * @return {?}
     */
    get tabindexAttr() {
        return this.tabindex !== '' ? '-1' : '';
    }
    /**
     * \@name ngAfterViewInit
     * @return {?}
     */
    ngAfterViewInit() {
        // set up listeners
        this.setUpKeypressListeners();
        this.setupSeparatorKeysListener();
        this.setUpInputKeydownListeners();
        if (this.onTextChange.observers.length) {
            this.setUpTextChangeSubscriber();
        }
        // if clear on blur is set to true, subscribe to the event and clear the text's form
        if (this.clearOnBlur || this.addOnBlur) {
            this.setUpOnBlurSubscriber();
        }
        // if addOnPaste is set to true, register the handler and add items
        if (this.addOnPaste) {
            this.setUpOnPasteListener();
        }
        const /** @type {?} */ statusChanges$ = this.inputForm.form.statusChanges;
        statusChanges$.pipe(filter((status) => status !== 'PENDING')).subscribe(() => {
            this.errors = this.inputForm.getErrorMessages(this.errorMessages);
        });
        this.isProgressBarVisible$ = statusChanges$.pipe(map((status) => {
            return status === 'PENDING' || this.isLoading;
        }));
        // if hideForm is set to true, remove the input
        if (this.hideForm) {
            this.inputForm.destroy();
        }
    }
    /**
     * \@name ngOnInit
     * @return {?}
     */
    ngOnInit() {
        // if the number of items specified in the model is > of the value of maxItems
        // degrade gracefully and let the max number of items to be the number of items in the model
        // though, warn the user.
        const /** @type {?} */ hasReachedMaxItems = this.maxItems !== undefined &&
            this.items &&
            this.items.length > this.maxItems;
        if (hasReachedMaxItems) {
            this.maxItems = this.items.length;
            console.warn(MAX_ITEMS_WARNING);
        }
        // Setting editable to false to fix problem with tags in IE still being editable when
        // onlyFromAutocomplete is true
        this.editable = this.onlyFromAutocomplete ? false : this.editable;
        this.setAnimationMetadata();
    }
    /**
     * \@name onRemoveRequested
     * @param {?} tag
     * @param {?} index
     * @return {?}
     */
    onRemoveRequested(tag, index) {
        return new Promise(resolve => {
            const /** @type {?} */ subscribeFn = (model) => {
                this.removeItem(model, index);
                resolve(tag);
            };
            this.onRemoving ?
                this.onRemoving(tag)
                    .pipe(first())
                    .subscribe(subscribeFn) : subscribeFn(tag);
        });
    }
    /**
     * \@name onAddingRequested
     * @param {?} fromAutocomplete {boolean}
     * @param {?} tag {TagModel}
     * @param {?=} index
     * @return {?}
     */
    onAddingRequested(fromAutocomplete, tag, index) {
        return new Promise((resolve, reject) => {
            const /** @type {?} */ subscribeFn = (model) => {
                return this
                    .addItem(fromAutocomplete, model, index)
                    .then(resolve)
                    .catch(reject);
            };
            return this.onAdding ?
                this.onAdding(tag)
                    .pipe(first())
                    .subscribe(subscribeFn, reject) : subscribeFn(tag);
        });
    }
    /**
     * \@name selectItem
     * @desc selects item passed as parameter as the selected tag
     * @param {?} item
     * @param {?=} emit
     * @return {?}
     */
    selectItem(item, emit = true) {
        const /** @type {?} */ isReadonly = item && typeof item !== 'string' && item["readonly"];
        if (isReadonly || this.selectedTag === item) {
            return;
        }
        this.selectedTag = item;
        if (emit) {
            this.onSelect.emit(item);
        }
    }
    /**
     * \@name fireEvents
     * @desc goes through the list of the events for a given eventName, and fires each of them
     * @param {?} eventName
     * @param {?=} $event
     * @return {?}
     */
    fireEvents(eventName, $event) {
        this.listeners[eventName].forEach(listener => listener.call(this, $event));
    }
    /**
     * \@name handleKeydown
     * @desc handles action when the user hits a keyboard key
     * @param {?} data
     * @return {?}
     */
    handleKeydown(data) {
        const /** @type {?} */ event = data.event;
        const /** @type {?} */ key = event.keyCode || event.which;
        const /** @type {?} */ shiftKey = event.shiftKey || false;
        switch (KEY_PRESS_ACTIONS[key]) {
            case ACTIONS_KEYS.DELETE:
                if (this.selectedTag && this.removable) {
                    const /** @type {?} */ index = this.items.indexOf(this.selectedTag);
                    this.onRemoveRequested(this.selectedTag, index);
                }
                break;
            case ACTIONS_KEYS.SWITCH_PREV:
                this.moveToTag(data.model, PREV);
                break;
            case ACTIONS_KEYS.SWITCH_NEXT:
                this.moveToTag(data.model, NEXT);
                break;
            case ACTIONS_KEYS.TAB:
                if (shiftKey) {
                    if (this.isFirstTag(data.model)) {
                        return;
                    }
                    this.moveToTag(data.model, PREV);
                }
                else {
                    if (this.isLastTag(data.model) && (this.disable || this.maxItemsReached)) {
                        return;
                    }
                    this.moveToTag(data.model, NEXT);
                }
                break;
            default:
                return;
        }
        // prevent default behaviour
        event.preventDefault();
    }
    /**
     * @return {?}
     */
    onFormSubmit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.onAddingRequested(false, this.formValue);
            }
            catch (_a) {
                return;
            }
        });
    }
    /**
     * \@name setInputValue
     * @param {?} value
     * @param {?=} emitEvent
     * @return {?}
     */
    setInputValue(value, emitEvent = true) {
        const /** @type {?} */ control = this.getControl();
        // update form value with the transformed item
        control.setValue(value, {
            emitEvent
        });
    }
    /**
     * \@name getControl
     * @return {?}
     */
    getControl() {
        return /** @type {?} */ (this.inputForm.value);
    }
    /**
     * \@name focus
     * @param {?=} applyFocus
     * @param {?=} displayAutocomplete
     * @return {?}
     */
    focus(applyFocus = false, displayAutocomplete = false) {
        if (this.dragProvider.getState('dragging')) {
            return;
        }
        this.selectItem(undefined, false);
        if (applyFocus) {
            this.inputForm.focus();
            this.onFocus.emit(this.formValue);
        }
    }
    /**
     * \@name blur
     * @return {?}
     */
    blur() {
        this.onTouched();
        this.onBlur.emit(this.formValue);
    }
    /**
     * \@name hasErrors
     * @return {?}
     */
    hasErrors() {
        return this.inputForm && this.inputForm.hasErrors();
    }
    /**
     * \@name isInputFocused
     * @return {?}
     */
    isInputFocused() {
        return this.inputForm && this.inputForm.isInputFocused();
    }
    /**
     * - this is the one way I found to tell if the template has been passed and it is not
     * the template for the menu item
     * \@name hasCustomTemplate
     * @return {?}
     */
    hasCustomTemplate() {
        const /** @type {?} */ template = this.templates ? this.templates.first : undefined;
        const /** @type {?} */ menuTemplate = this.dropdown && this.dropdown.templates ?
            this.dropdown.templates.first : undefined;
        return Boolean(template && template !== menuTemplate);
    }
    /**
     * \@name maxItemsReached
     * @return {?}
     */
    get maxItemsReached() {
        return this.maxItems !== undefined &&
            this.items.length >= this.maxItems;
    }
    /**
     * \@name formValue
     * @return {?}
     */
    get formValue() {
        const /** @type {?} */ form = this.inputForm.value;
        return form ? form.value : '';
    }
    /**
     * 3
     * \@name onDragStarted
     * @param {?} event
     * @param {?} tag
     * @param {?} index
     * @return {?}
     */
    onDragStarted(event, tag, index) {
        event.stopPropagation();
        const /** @type {?} */ item = /** @type {?} */ ({ zone: this.dragZone, tag, index });
        this.dragProvider.setSender(this);
        this.dragProvider.setDraggedItem(event, item);
        this.dragProvider.setState({ dragging: true, index });
    }
    /**
     * \@name onDragOver
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    onDragOver(event, index) {
        this.dragProvider.setState({ dropping: true });
        this.dragProvider.setReceiver(this);
        event.preventDefault();
    }
    /**
     * \@name onTagDropped
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    onTagDropped(event, index) {
        const /** @type {?} */ item = this.dragProvider.getDraggedItem(event);
        if (item.zone !== this.dragZone) {
            return;
        }
        this.dragProvider.onTagDropped(item.tag, item.index, index);
        event.preventDefault();
        event.stopPropagation();
    }
    /**
     * \@name isDropping
     * @return {?}
     */
    isDropping() {
        const /** @type {?} */ isReceiver = this.dragProvider.receiver === this;
        const /** @type {?} */ isDropping = this.dragProvider.getState('dropping');
        return Boolean(isReceiver && isDropping);
    }
    /**
     * \@name onTagBlurred
     * @param {?} changedElement {TagModel}
     * @param {?} index {number}
     * @return {?}
     */
    onTagBlurred(changedElement, index) {
        this.items[index] = changedElement;
        this.blur();
    }
    /**
     * \@name trackBy
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackBy(index, item) {
        return item[this.identifyBy];
    }
    /**
     * \@name updateEditedTag
     * @param {?} __0
     * @return {?}
     */
    updateEditedTag({ tag, index }) {
        this.onTagEdited.emit(tag);
    }
    /**
     * \@name moveToTag
     * @param {?} item
     * @param {?} direction
     * @return {?}
     */
    moveToTag(item, direction) {
        const /** @type {?} */ isLast = this.isLastTag(item);
        const /** @type {?} */ isFirst = this.isFirstTag(item);
        const /** @type {?} */ stopSwitch = (direction === NEXT && isLast) ||
            (direction === PREV && isFirst);
        if (stopSwitch) {
            this.focus(true);
            return;
        }
        const /** @type {?} */ offset = direction === NEXT ? 1 : -1;
        const /** @type {?} */ index = this.getTagIndex(item) + offset;
        const /** @type {?} */ tag = this.getTagAtIndex(index);
        return tag.select.call(tag);
    }
    /**
     * \@name isFirstTag
     * @param {?} item {TagModel}
     * @return {?}
     */
    isFirstTag(item) {
        return this.tags.first.model === item;
    }
    /**
     * \@name isLastTag
     * @param {?} item {TagModel}
     * @return {?}
     */
    isLastTag(item) {
        return this.tags.last.model === item;
    }
    /**
     * \@name getTagIndex
     * @param {?} item
     * @return {?}
     */
    getTagIndex(item) {
        const /** @type {?} */ tags = this.tags.toArray();
        return tags.findIndex(tag => tag.model === item);
    }
    /**
     * \@name getTagAtIndex
     * @param {?} index
     * @return {?}
     */
    getTagAtIndex(index) {
        const /** @type {?} */ tags = this.tags.toArray();
        return tags[index];
    }
    /**
     * \@name removeItem
     * @desc removes an item from the array of the model
     * @param {?} tag {TagModel}
     * @param {?} index {number}
     * @return {?}
     */
    removeItem(tag, index) {
        this.items = this.getItemsWithout(index);
        // if the removed tag was selected, set it as undefined
        if (this.selectedTag === tag) {
            this.selectItem(undefined, false);
        }
        // focus input
        this.focus(true, false);
        // emit remove event
        this.onRemove.emit(tag);
    }
    /**
     * \@name addItem
     * @desc adds the current text model to the items array
     * @param {?=} fromAutocomplete
     * @param {?=} item
     * @param {?=} index
     * @return {?}
     */
    addItem(fromAutocomplete = false, item, index) {
        const /** @type {?} */ display = this.getItemDisplay(item);
        const /** @type {?} */ tag = this.createTag(item);
        if (fromAutocomplete) {
            this.setInputValue(display);
        }
        return new Promise((resolve, reject) => {
            /**
             * \@name reset
             */
            const /** @type {?} */ reset = () => {
                // reset control and focus input
                this.setInputValue('');
                // focus input
                this.focus(true, false);
                resolve(display);
            };
            const /** @type {?} */ appendItem = () => {
                this.appendTag(tag, index);
                // emit event
                this.onAdd.emit(tag);
                if (!this.dropdown) {
                    return;
                }
                this.dropdown.hide();
                if (this.dropdown.showDropdownIfEmpty) {
                    this.dropdown.show();
                }
            };
            const /** @type {?} */ status = this.inputForm.form.status;
            const /** @type {?} */ isTagValid = this.isTagValid(tag, fromAutocomplete);
            const /** @type {?} */ onValidationError = () => {
                this.onValidationError.emit(tag);
                return reject();
            };
            if (status === 'VALID' && isTagValid) {
                appendItem();
                return reset();
            }
            if (status === 'INVALID' || !isTagValid) {
                reset();
                return onValidationError();
            }
            if (status === 'PENDING') {
                const /** @type {?} */ statusUpdate$ = this.inputForm.form.statusChanges;
                return statusUpdate$
                    .pipe(filter(statusUpdate => statusUpdate !== 'PENDING'), first())
                    .subscribe((statusUpdate) => {
                    if (statusUpdate === 'VALID' && isTagValid) {
                        appendItem();
                        resolve();
                    }
                    else {
                        onValidationError();
                    }
                });
            }
        });
    }
    /**
     * \@name setupSeparatorKeysListener
     * @return {?}
     */
    setupSeparatorKeysListener() {
        const /** @type {?} */ useSeparatorKeys = this.separatorKeyCodes.length > 0 || this.separatorKeys.length > 0;
        const /** @type {?} */ listener = ($event) => {
            const /** @type {?} */ hasKeyCode = this.separatorKeyCodes.indexOf($event.keyCode) >= 0;
            const /** @type {?} */ hasKey = this.separatorKeys.indexOf($event.key) >= 0;
            // the keyCode of keydown event is 229 when IME is processing the key event.
            const /** @type {?} */ isIMEProcessing = $event.keyCode === 229;
            if (hasKeyCode || (hasKey && !isIMEProcessing)) {
                $event.preventDefault();
                this.onAddingRequested(false, this.formValue)
                    .catch(() => { });
            }
        };
        listen.call(this, KEYDOWN, listener, useSeparatorKeys);
    }
    /**
     * \@name setUpKeypressListeners
     * @return {?}
     */
    setUpKeypressListeners() {
        const /** @type {?} */ listener = ($event) => {
            const /** @type {?} */ isCorrectKey = $event.keyCode === 37 || $event.keyCode === 8;
            if (isCorrectKey &&
                !this.formValue &&
                this.items.length) {
                this.tags.last.select.call(this.tags.last);
            }
        };
        // setting up the keypress listeners
        listen.call(this, KEYDOWN, listener);
    }
    /**
     * \@name setUpKeydownListeners
     * @return {?}
     */
    setUpInputKeydownListeners() {
        this.inputForm.onKeydown.subscribe(event => {
            this.fireEvents('keydown', event);
            if (event.key === 'Backspace' && this.formValue.trim() === '') {
                event.preventDefault();
            }
        });
    }
    /**
     * \@name setUpOnPasteListener
     * @return {?}
     */
    setUpOnPasteListener() {
        const /** @type {?} */ input = this.inputForm.input.nativeElement;
        // attach listener to input
        this.renderer.listen(input, 'paste', (event) => {
            this.onPasteCallback(event);
            event.preventDefault();
            return true;
        });
    }
    /**
     * \@name setUpTextChangeSubscriber
     * @return {?}
     */
    setUpTextChangeSubscriber() {
        this.inputForm.form
            .valueChanges
            .pipe(debounceTime(this.onTextChangeDebounce))
            .subscribe((value) => {
            this.onTextChange.emit(value.item);
        });
    }
    /**
     * \@name setUpOnBlurSubscriber
     * @return {?}
     */
    setUpOnBlurSubscriber() {
        const /** @type {?} */ filterFn = () => {
            const /** @type {?} */ isVisible = this.dropdown && this.dropdown.isVisible;
            return !isVisible && !!this.formValue;
        };
        this.inputForm
            .onBlur
            .pipe(debounceTime(100), filter(filterFn))
            .subscribe(() => {
            const /** @type {?} */ reset = () => this.setInputValue('');
            if (this.addOnBlur) {
                return this
                    .onAddingRequested(false, this.formValue)
                    .then(reset)
                    .catch(reset);
            }
            reset();
        });
    }
    /**
     * \@name findDupe
     * @param {?} tag
     * @param {?} isFromAutocomplete
     * @return {?}
     */
    findDupe(tag, isFromAutocomplete) {
        const /** @type {?} */ identifyBy = isFromAutocomplete ? this.dropdown.identifyBy : this.identifyBy;
        const /** @type {?} */ id = tag[identifyBy];
        return this.items.find(item => this.getItemValue(item) === id);
    }
    /**
     * \@name setAnimationMetadata
     * @return {?}
     */
    setAnimationMetadata() {
        this.animationMetadata = {
            value: 'in',
            params: Object.assign({}, this.animationDuration)
        };
    }
}
TagInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'tag-input',
                providers: [CUSTOM_ACCESSOR],
                styles: [`.dark tag:focus{-webkit-box-shadow:0 0 0 1px #323232;box-shadow:0 0 0 1px #323232}.ng2-tag-input.bootstrap3-info{background-color:#fff;display:inline-block;color:#555;vertical-align:middle;max-width:100%;height:42px;line-height:44px}.ng2-tag-input.bootstrap3-info input{border:none;-webkit-box-shadow:none;box-shadow:none;outline:0;background-color:transparent;padding:0 6px;margin:0;width:auto;max-width:inherit}.ng2-tag-input.bootstrap3-info .form-control input::-moz-placeholder{color:#777;opacity:1}.ng2-tag-input.bootstrap3-info .form-control input:-ms-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info .form-control input::-webkit-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info input:focus{border:none;-webkit-box-shadow:none;box-shadow:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--focused{-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.4);box-shadow:inset 0 1px 1px rgba(0,0,0,.4);border:1px solid #ccc}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{-webkit-box-shadow:inset 0 1px 1px #d9534f;box-shadow:inset 0 1px 1px #d9534f}.ng2-tag-input{display:block;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;-webkit-transition:all .25s;transition:all .25s;padding:.25rem 0;min-height:32px;cursor:text;border-bottom:2px solid #efefef}.ng2-tag-input:focus{outline:0}.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #2196f3}.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #f44336}.ng2-tag-input.ng2-tag-input--loading{border:none}.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.ng2-tag-input form{margin:.1em 0}.ng2-tag-input .ng2-tags-container{-ms-flex-wrap:wrap;flex-wrap:wrap;display:-webkit-box;display:-ms-flexbox;display:flex}.minimal.ng2-tag-input{display:block;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;cursor:text;border-bottom:1px solid transparent}.minimal.ng2-tag-input:focus{outline:0}.minimal.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.minimal.ng2-tag-input.ng2-tag-input--loading{border:none}.minimal.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.minimal.ng2-tag-input .ng2-tags-container{-ms-flex-wrap:wrap;flex-wrap:wrap;display:-webkit-box;display:-ms-flexbox;display:flex}.dark.ng2-tag-input{display:block;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #444}.dark.ng2-tag-input:focus{outline:0}.dark.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.dark.ng2-tag-input.ng2-tag-input--loading{border:none}.dark.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.dark.ng2-tag-input .ng2-tags-container{-ms-flex-wrap:wrap;flex-wrap:wrap;display:-webkit-box;display:-ms-flexbox;display:flex}.bootstrap.ng2-tag-input{display:block;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #efefef}.bootstrap.ng2-tag-input:focus{outline:0}.bootstrap.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #0275d8}.bootstrap.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #d9534f}.bootstrap.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap.ng2-tag-input .ng2-tags-container{-ms-flex-wrap:wrap;flex-wrap:wrap;display:-webkit-box;display:-ms-flexbox;display:flex}.bootstrap3-info.ng2-tag-input{display:block;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;padding:4px;cursor:text;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);border-radius:4px}.bootstrap3-info.ng2-tag-input:focus{outline:0}.bootstrap3-info.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{border-bottom:1px solid #d9534f}.bootstrap3-info.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap3-info.ng2-tag-input form{margin:.1em 0}.bootstrap3-info.ng2-tag-input .ng2-tags-container{-ms-flex-wrap:wrap;flex-wrap:wrap;display:-webkit-box;display:-ms-flexbox;display:flex}.error-message{font-size:.8em;color:#f44336;margin:.5em 0 0}.bootstrap .error-message{color:#d9534f}.progress-bar,.progress-bar:before{height:2px;width:100%;margin:0}.progress-bar{background-color:#2196f3;display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;bottom:0}.progress-bar:before{background-color:#82c4f8;content:'';-webkit-animation:2s cubic-bezier(.4,0,.2,1) infinite running-progress;animation:2s cubic-bezier(.4,0,.2,1) infinite running-progress}@-webkit-keyframes running-progress{0%{margin-left:0;margin-right:100%}50%{margin-left:25%;margin-right:0}100%{margin-left:100%;margin-right:0}}@keyframes running-progress{0%{margin-left:0;margin-right:100%}50%{margin-left:25%;margin-right:0}100%{margin-left:100%;margin-right:0}}tag{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;font-family:Roboto,"Helvetica Neue",sans-serif;font-weight:400;font-size:1em;letter-spacing:.05rem;color:#444;border-radius:16px;-webkit-transition:all .3s;transition:all .3s;margin:.1rem .3rem .1rem 0;padding:.08rem .45rem;height:32px;line-height:34px;background:#efefef;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}tag:not(.readonly):not(.tag--editing):focus{background:#2196f3;color:#fff;-webkit-box-shadow:0 2px 3px 1px #d4d1d1;box-shadow:0 2px 3px 1px #d4d1d1}tag:not(.readonly):not(.tag--editing):active{background:#0d8aee;color:#fff;-webkit-box-shadow:0 2px 3px 1px #d4d1d1;box-shadow:0 2px 3px 1px #d4d1d1}tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#e2e2e2;color:initial;-webkit-box-shadow:0 2px 3px 1px #d4d1d1;box-shadow:0 2px 3px 1px #d4d1d1}tag.readonly{cursor:default}tag.readonly:focus,tag:focus{outline:0}tag.tag--editing{background-color:#fff;border:1px solid #ccc;cursor:text}.minimal tag{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;border-radius:0;background:#f9f9f9;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.minimal tag:not(.readonly):not(.tag--editing):active,.minimal tag:not(.readonly):not(.tag--editing):focus{background:#d0d0d0;color:initial}.minimal tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#ececec}.minimal tag.readonly{cursor:default}.minimal tag.readonly:focus,.minimal tag:focus{outline:0}.minimal tag.tag--editing{cursor:text}.dark tag{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;color:#f9f9f9;border-radius:3px;background:#444;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.dark tag:not(.readonly):not(.tag--editing):focus{background:#efefef;color:#444}.dark tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#2b2b2b;color:#f9f9f9}.dark tag.readonly{cursor:default}.dark tag.readonly:focus,.dark tag:focus{outline:0}.dark tag.tag--editing{cursor:text}.bootstrap tag{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;color:#f9f9f9;border-radius:.25rem;background:#0275d8;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.bootstrap tag:not(.readonly):not(.tag--editing):active,.bootstrap tag:not(.readonly):not(.tag--editing):focus{background:#025aa5}.bootstrap tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#0267bf;color:#f9f9f9}.bootstrap tag.readonly{cursor:default}.bootstrap tag.readonly:focus,.bootstrap tag:focus{outline:0}.bootstrap tag.tag--editing{cursor:text}.bootstrap3-info tag{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;font-family:inherit;font-weight:400;font-size:95%;color:#fff;border-radius:.25em;background:#5bc0de;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative;padding:.25em .6em;text-align:center;white-space:nowrap}.bootstrap3-info tag:not(.readonly):not(.tag--editing):active,.bootstrap3-info tag:not(.readonly):not(.tag--editing):focus{background:#28a1c5}.bootstrap3-info tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#46b8da;color:#fff}.bootstrap3-info tag.readonly{cursor:default}.bootstrap3-info tag.readonly:focus,.bootstrap3-info tag:focus{outline:0}.bootstrap3-info tag.tag--editing{cursor:text}:host{display:block}`],
                template: `<!-- CONTAINER -->

<div ngClass="ng2-tag-input {{ theme || '' }}"
     (click)="focus(true, false)"
     [attr.tabindex]="-1"

     (drop)="dragZone ? onTagDropped($event, undefined) : undefined"
     (dragenter)="dragZone ? onDragOver($event) : undefined"
     (dragover)="dragZone ? onDragOver($event) : undefined"
     (dragend)="dragZone ? dragProvider.onDragEnd() : undefined"

     [class.ng2-tag-input--dropping]="isDropping()"
     [class.ng2-tag-input--disabled]="disable"
     [class.ng2-tag-input--loading]="isLoading"
     [class.ng2-tag-input--invalid]="hasErrors()"
     [class.ng2-tag-input--focused]="isInputFocused()">

    <!-- TAGS -->
    <div class="ng2-tags-container">
        <tag *ngFor="let item of items; let i = index; trackBy: trackBy"

             (onSelect)="selectItem(item)"
             (onRemove)="onRemoveRequested(item, i)"
             (onKeyDown)="handleKeydown($event)"
             (onTagEdited)="updateEditedTag($event)"
             (onBlur)="onTagBlurred($event, i)"
             draggable="{{ editable }}"

             (dragstart)="dragZone ? onDragStarted($event, item, i) : undefined"
             (drop)="dragZone ? onTagDropped($event, i) : undefined"
             (dragenter)="dragZone ? onDragOver($event) : undefined"
             (dragover)="dragZone ? onDragOver($event, i) : undefined"
             (dragleave)="dragZone ? dragProvider.onDragEnd() : undefined"

             [canAddTag]="isTagValid"
             [attr.tabindex]="0"
             [disabled]="disable"
             [@animation]="animationMetadata"
             [hasRipple]="ripple"
             [index]="i"
             [removable]="removable"
             [editable]="editable"
             [displayBy]="displayBy"
             [identifyBy]="identifyBy"
             [template]="!!hasCustomTemplate() ? templates.first : undefined"
             [draggable]="dragZone"
             [model]="item">
        </tag>

        <tag-input-form
            (onSubmit)="onFormSubmit()"
            (onBlur)="blur()"
            (click)="dropdown ? dropdown.show() : undefined"
            (onKeydown)="fireEvents('keydown', $event)"
            (onKeyup)="fireEvents('keyup', $event)"

            [(inputText)]="inputText"
            [disabled]="disable"
            [validators]="validators"
            [asyncValidators]="asyncValidators"
            [hidden]="maxItemsReached"
            [placeholder]="items.length ? placeholder : secondaryPlaceholder"
            [inputClass]="inputClass"
            [inputId]="inputId"
            [tabindex]="tabindex">
        </tag-input-form>
    </div>

    <div class="progress-bar" *ngIf="isProgressBarVisible$ | async"></div>
</div>

<!-- ERRORS -->
<div *ngIf="hasErrors()" class="error-messages {{ theme || '' }}">
    <p *ngFor="let error of errors" class="error-message">
        <span>{{ error }}</span>
    </p>
</div>

<ng-content></ng-content>
`,
                animations
            },] },
];
/** @nocollapse */
TagInputComponent.ctorParameters = () => [
    { type: Renderer2, },
    { type: DragProvider, },
];
TagInputComponent.propDecorators = {
    "separatorKeys": [{ type: Input },],
    "separatorKeyCodes": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "secondaryPlaceholder": [{ type: Input },],
    "maxItems": [{ type: Input },],
    "validators": [{ type: Input },],
    "asyncValidators": [{ type: Input },],
    "onlyFromAutocomplete": [{ type: Input },],
    "errorMessages": [{ type: Input },],
    "theme": [{ type: Input },],
    "onTextChangeDebounce": [{ type: Input },],
    "inputId": [{ type: Input },],
    "inputClass": [{ type: Input },],
    "clearOnBlur": [{ type: Input },],
    "hideForm": [{ type: Input },],
    "addOnBlur": [{ type: Input },],
    "addOnPaste": [{ type: Input },],
    "pasteSplitPattern": [{ type: Input },],
    "blinkIfDupe": [{ type: Input },],
    "removable": [{ type: Input },],
    "editable": [{ type: Input },],
    "allowDupes": [{ type: Input },],
    "modelAsStrings": [{ type: Input },],
    "trimTags": [{ type: Input },],
    "inputText": [{ type: Input },],
    "ripple": [{ type: Input },],
    "tabindex": [{ type: Input },],
    "disable": [{ type: Input },],
    "dragZone": [{ type: Input },],
    "onRemoving": [{ type: Input },],
    "onAdding": [{ type: Input },],
    "animationDuration": [{ type: Input },],
    "onAdd": [{ type: Output },],
    "onRemove": [{ type: Output },],
    "onSelect": [{ type: Output },],
    "onFocus": [{ type: Output },],
    "onBlur": [{ type: Output },],
    "onTextChange": [{ type: Output },],
    "onPaste": [{ type: Output },],
    "onValidationError": [{ type: Output },],
    "onTagEdited": [{ type: Output },],
    "dropdown": [{ type: ContentChild, args: [TagInputDropdown,] },],
    "templates": [{ type: ContentChildren, args: [TemplateRef, { descendants: false },] },],
    "inputForm": [{ type: ViewChild, args: [TagInputForm,] },],
    "tags": [{ type: ViewChildren, args: [TagComponent,] },],
    "inputTextChange": [{ type: Output },],
    "tabindexAttr": [{ type: HostBinding, args: ['attr.tabindex',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DeleteIconComponent {
}
DeleteIconComponent.decorators = [
    { type: Component, args: [{
                selector: 'delete-icon',
                template: `<span>
    <svg height="16px" viewBox="0 0 32 32" width="16px">
        <path d="M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z"
              fill="#121313" />
    </svg>
</span>
`,
                styles: [`.dark tag:focus{-webkit-box-shadow:0 0 0 1px #323232;box-shadow:0 0 0 1px #323232}.ng2-tag-input.bootstrap3-info{background-color:#fff;display:inline-block;color:#555;vertical-align:middle;max-width:100%;height:42px;line-height:44px}.ng2-tag-input.bootstrap3-info input{border:none;-webkit-box-shadow:none;box-shadow:none;outline:0;background-color:transparent;padding:0 6px;margin:0;width:auto;max-width:inherit}.ng2-tag-input.bootstrap3-info .form-control input::-moz-placeholder{color:#777;opacity:1}.ng2-tag-input.bootstrap3-info .form-control input:-ms-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info .form-control input::-webkit-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info input:focus{border:none;-webkit-box-shadow:none;box-shadow:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--focused{-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.4);box-shadow:inset 0 1px 1px rgba(0,0,0,.4);border:1px solid #ccc}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{-webkit-box-shadow:inset 0 1px 1px #d9534f;box-shadow:inset 0 1px 1px #d9534f}.ng2-tag-input{display:block;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;-webkit-transition:all .25s;transition:all .25s;padding:.25rem 0;min-height:32px;cursor:text;border-bottom:2px solid #efefef}.ng2-tag-input:focus{outline:0}.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #2196f3}.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #f44336}.ng2-tag-input.ng2-tag-input--loading{border:none}.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.ng2-tag-input form{margin:.1em 0}.ng2-tag-input .ng2-tags-container{-ms-flex-wrap:wrap;flex-wrap:wrap;display:-webkit-box;display:-ms-flexbox;display:flex}.minimal.ng2-tag-input{display:block;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;cursor:text;border-bottom:1px solid transparent}.minimal.ng2-tag-input:focus{outline:0}.minimal.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.minimal.ng2-tag-input.ng2-tag-input--loading{border:none}.minimal.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.minimal.ng2-tag-input .ng2-tags-container{-ms-flex-wrap:wrap;flex-wrap:wrap;display:-webkit-box;display:-ms-flexbox;display:flex}.dark.ng2-tag-input{display:block;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #444}.dark.ng2-tag-input:focus{outline:0}.dark.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.dark.ng2-tag-input.ng2-tag-input--loading{border:none}.dark.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.dark.ng2-tag-input .ng2-tags-container{-ms-flex-wrap:wrap;flex-wrap:wrap;display:-webkit-box;display:-ms-flexbox;display:flex}.bootstrap.ng2-tag-input{display:block;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #efefef}.bootstrap.ng2-tag-input:focus{outline:0}.bootstrap.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #0275d8}.bootstrap.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #d9534f}.bootstrap.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap.ng2-tag-input .ng2-tags-container{-ms-flex-wrap:wrap;flex-wrap:wrap;display:-webkit-box;display:-ms-flexbox;display:flex}.bootstrap3-info.ng2-tag-input{display:block;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;padding:4px;cursor:text;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);border-radius:4px}.bootstrap3-info.ng2-tag-input:focus{outline:0}.bootstrap3-info.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{border-bottom:1px solid #d9534f}.bootstrap3-info.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap3-info.ng2-tag-input form{margin:.1em 0}.bootstrap3-info.ng2-tag-input .ng2-tags-container{-ms-flex-wrap:wrap;flex-wrap:wrap;display:-webkit-box;display:-ms-flexbox;display:flex}.error-message{font-size:.8em;color:#f44336;margin:.5em 0 0}.bootstrap .error-message{color:#d9534f}:host(delete-icon){width:20px;height:16px;-webkit-transition:all .15s;transition:all .15s;display:inline-block;text-align:right}:host(delete-icon) path{fill:#444}:host(delete-icon) svg{vertical-align:bottom;height:34px}:host(delete-icon):hover{-webkit-transform:scale(1.5) translateY(-3px);transform:scale(1.5) translateY(-3px)}:host-context(.dark){text-align:right}:host-context(.dark) path{fill:#fff}:host-context(.dark) svg{vertical-align:bottom;height:34px}:host-context(.minimal){text-align:right}:host-context(.minimal) path{fill:#444}:host-context(.minimal) svg{vertical-align:bottom;height:34px}:host-context(.bootstrap){text-align:right}:host-context(.bootstrap) path{fill:#fff}:host-context(.bootstrap) svg{vertical-align:bottom;height:34px}:host-context(tag:active) path,:host-context(tag:focus) path{fill:#fff}:host-context(.darktag:active) path,:host-context(.darktag:focus) path{fill:#000}:host-context(.minimaltag:active) path,:host-context(.minimaltag:focus) path{fill:#000}:host-context(.bootstraptag:active) path,:host-context(.bootstraptag:focus) path{fill:#fff}:host-context(.bootstrap3-info){height:inherit}:host-context(.bootstrap3-info) path{fill:#fff}`]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const optionsProvider = new OptionsProvider();
class TagInputModule {
    /**
     * \@name withDefaults
     * @param {?} options {Options}
     * @return {?}
     */
    static withDefaults(options) {
        optionsProvider.setOptions(options);
    }
}
TagInputModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    FormsModule,
                    Ng2DropdownModule
                ],
                declarations: [
                    TagInputComponent,
                    DeleteIconComponent,
                    TagInputForm,
                    TagComponent,
                    HighlightPipe,
                    TagInputDropdown,
                    TagRipple
                ],
                exports: [
                    TagInputComponent,
                    DeleteIconComponent,
                    TagInputForm,
                    TagComponent,
                    HighlightPipe,
                    TagInputDropdown,
                    TagRipple
                ],
                providers: [
                    DragProvider,
                    { provide: COMPOSITION_BUFFER_MODE, useValue: false },
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { TagInputModule, TagInputDropdown, DeleteIconComponent, TagInputForm, TagRipple, TagComponent, TagInputComponent, animations as ɵb, TagInputAccessor as ɵa, HighlightPipe as ɵd, DragProvider as ɵc };
//# sourceMappingURL=ngx-chips.js.map
