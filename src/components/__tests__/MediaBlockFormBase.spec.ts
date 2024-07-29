import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import MediaBlockFormBase from '../MediaBlockFormBase.vue';

describe('MediaBlockFormBase', () => {
  const initialBlockData = {
    title: 'Test Title',
    duration: 60,
    startTime: 1627689600,
    color: '#ff0000',
  };

  const submitButtonText = 'Submit';

  it('renders with initial data', () => {
    const wrapper = mount(MediaBlockFormBase, {
      props: {
        initialBlockData,
        submitButtonText,
        onSubmit: vi.fn(),
      },
    });

    expect(wrapper.find('input[type="text"]').element.value).toBe(initialBlockData.title);
    expect(wrapper.find('input[type="number"]').element.value).toBe(initialBlockData.duration.toString());
    expect(wrapper.find('input[type="color"]').element.value).toBe(initialBlockData.color);
  });

  it('emits onSubmit with blockData when the form is submitted', async () => {
    const onSubmit = vi.fn();
    const wrapper = mount(MediaBlockFormBase, {
      props: {
        initialBlockData,
        submitButtonText,
        onSubmit,
      },
    });

    await wrapper.find('form').trigger('submit.prevent');

    expect(onSubmit).toHaveBeenCalledWith(initialBlockData);
  });

  it('calls onCancel when the cancel button is clicked', async () => {
    const onCancel = vi.fn();
    const wrapper = mount(MediaBlockFormBase, {
      props: {
        initialBlockData,
        submitButtonText,
        onSubmit: vi.fn(),
        onCancel,
      },
    });

    const cancelButton = wrapper.find('button[type="button"]');
    await cancelButton.trigger('click');

    expect(onCancel).toHaveBeenCalled();
  });

  it('does not show the cancel button if onCancel is not provided', () => {
    const wrapper = mount(MediaBlockFormBase, {
      props: {
        initialBlockData,
        submitButtonText,
        onSubmit: vi.fn(),
      },
    });

    const cancelButton = wrapper.find('button[type="button"]');
    expect(cancelButton.exists()).toBe(false);
  });
});
