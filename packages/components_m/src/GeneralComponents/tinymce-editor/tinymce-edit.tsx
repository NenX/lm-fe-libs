import { request } from '@lm_fe/utils';
import '@npkg/tinymce-plugins/importword';
import { Editor } from '@tinymce/tinymce-react';
import { get } from 'lodash';
import { useRef } from 'react';
interface IProps {
  [key: string]: any;
}
export default function TinymceEdit({ ...props }: IProps) {
  const editorRef: any = useRef(null);

  function handleEditorChange(content: any, editor: any) {
    console.log('Content was updated:', content);
    props.onChange(content);
  }

  return (
    <div className="tinymce-edit-container">
      <Editor
        // initialValue={props.value}
        value={props.value}
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          language: 'zh_CN',
          height: 500,
          plugins:
            'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons importword',
          imagetools_cors_hosts: ['picsum.photos'],
          //   menubar: 'file edit view insert format tools table help',
          menubar: false,
          toolbar:
            'undo redo | bold italic underline strikethrough importword | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap  | fullscreen  preview  print | insertfile image   link anchor codesample | ltr rtl ',
          toolbar_sticky: true,
          image_advtab: true,
          //   images_upload_url: '/api/uploadImage',
          images_upload_handler: (blob, success, fail) => {
            let data = new FormData();
            data.append('file', blob.blob());
            request
              .post('/api/uploadImage', data)
              .then((response) => {
                success(get(response, `url`));
              })
              .catch(function (error) {
                fail('图片上传失败');
              });
          },
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
}
